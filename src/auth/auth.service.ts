import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/providers';
import { RegisterInput } from './dtos';
import { BaseApiResponse } from 'src/shared/dtos';
import { UserOutputDto } from '../modules/user/dto';
import { User } from 'src/modules/user/entities';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, Payload, RefreshTokenPayload } from './auth.interface';
import { generateCode } from 'src/shared/utils/user.util';
import { MailService } from '../shared/providers';
import { MAIL_TEMPLATE, MESSAGES } from 'src/common/constants/common';
import { plainToInstance } from 'class-transformer';

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

  public sendEmailVerification(user: User) {
    const subject = 'Askany - Xác thực tài khoản';
    const context = {
      fullname: user.fullname,
      verification_url: `${process.env.VERIFICATION_DOMAIN}/auth/vertify-email?email=${user.email}&code=${user.emailVerifyCode}`,
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
}
