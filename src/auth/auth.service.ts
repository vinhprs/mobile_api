import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { MAIL_TEMPLATE, MESSAGES } from 'src/common/constants/common';
import { User } from 'src/modules/user/entities';
import { BaseApiResponse } from 'src/shared/dtos';
import { generateCode } from 'src/shared/utils/user.util';
import { UserOutputDto } from '../modules/user/dto';
import { UserService } from '../modules/user/providers';
import { MailService } from '../shared/providers';
import { JwtPayload, Payload, RefreshTokenPayload } from './auth.interface';
import { ForgotPassword, RegisterInput } from './dtos';
import { LoginInput } from './dtos/auth-login-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  public async register(
    data: RegisterInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    const createdUser = await this.userService.create(data);
    const jwt = this.generateToken(createdUser);
    const emailVerifyCode = generateCode();

    await this.userService.update(createdUser._id, {
      refreshToken: jwt.refreshToken,
      emailVerifyCode: emailVerifyCode,
    });
    createdUser.emailVerifyCode = emailVerifyCode;
    this.sendEmailVerification(createdUser);
    const userOutput = plainToInstance(UserOutputDto, createdUser, {
      excludeExtraneousValues: true,
    });
    return plainToInstance(BaseApiResponse<UserOutputDto>, {
      error: false,
      data: {
        token: jwt.accessToken,
        refreshToken: jwt.refreshToken,
        infoUser: userOutput,
      },
      message: MESSAGES.CREATED_SUCCEED,
      code: 0,
    });
  }

  public async login(
    data: LoginInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    const user = await this.userService.validateUser(data);
    if (!user.isVerifyEmail)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.UNCONFIRMED_ACCOUNT,
          code: 1,
        },
        HttpStatus.BAD_REQUEST,
      );
    const jwt = this.generateToken(user);
    await this.userService.update(user._id, {
      refreshToken: jwt.refreshToken,
    });
    return plainToInstance(BaseApiResponse<UserOutputDto>, {
      error: false,
      data: {
        token: jwt.accessToken,
        refreshToken: jwt.refreshToken,
        infoUser: user,
      },
      message: MESSAGES.UPDATE_SUCCEED,
      code: 0,
    });
  }

  public generateToken(user: User | UserOutputDto): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.generateAccessToken({
        id: user._id,
        email: user.email,
        roles: user.roles,
      }),
      refreshToken: this.generateRefreshToken({
        sub: user._id,
      }),
    };
  }

  public async forgotPassword(
    data: ForgotPassword,
  ): Promise<BaseApiResponse<null>> {
    const { email } = data;
    const user = await this.userService.getUserByEmail(email);

    if (!user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND_USER,
          code: 1,
        },
        HttpStatus.BAD_REQUEST,
      );
    const emailVerifyCode = generateCode();
    await this.userService.update(user._id, {
      emailVerifyCode: emailVerifyCode,
    });
    user.emailVerifyCode = emailVerifyCode;
    this.sendForgotPassword(user);
    return {
      error: false,
      data: null,
      message: MESSAGES.SENT_EMAIL_TO_RECOVER_PASSWORD,
      code: 0,
    };
  }

  public generateAccessToken(data: Payload): string {
    const payload: JwtPayload = {
      sub: data.id,
      email: data.email,
      roles: data.roles,
    };
    return this.jwt.sign(payload);
  }

  public generateRefreshToken(data: RefreshTokenPayload): string {
    return this.jwt.sign(data);
  }

  public sendEmailVerification(user: User | UserOutputDto) {
    const subject = 'Askany - Xác thực tài khoản';
    const context = {
      fullname: user.fullname,
      verifyCode: user.emailVerifyCode,
    };
    this.mailService
      .sendMail(
        user.email,
        subject,
        context,
        MAIL_TEMPLATE.VERIFY_EMAIL_TEMPLATE,
      )
      .then(() => {
        return true;
      });
  }

  public sendForgotPassword(user: User | UserOutputDto) {
    const subject = 'Prime Edu - Forgot password';
    const context = {
      fullname: user.fullname,
      verifyCode: user.emailVerifyCode,
    };
    this.mailService
      .sendMail(
        user.email,
        subject,
        context,
        MAIL_TEMPLATE.FORGOT_PASSWORD_TEMPLATE,
      )
      .then(() => {
        return true;
      });
  }
}
