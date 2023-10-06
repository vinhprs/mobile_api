import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { LoginInput } from '../../../auth/dtos/auth-login-input.dto';
import { MESSAGES } from '../../../common/constants/common';
import { UpdateProfileDto } from '../../../modules/profile/dto/update-profile.dto';
import { BaseApiResponse } from '../../../shared/dtos';
import { ROLES } from '../../../shared/enums';
import { Repository } from 'typeorm';
import {
  RegisterInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '../../../auth/dtos';
import { UpdateUserInput, UserOutputDto } from '../dto';
import { User } from '../entities';
import { RoleService } from './role.service';
import { AddressService } from 'src/modules/address/address.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private readonly roleService: RoleService,
    private readonly addressService: AddressService,
  ) {}

  public async getUserByEmail(email: string): Promise<UserOutputDto> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async getUserByUserId(_id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { _id },
      relations: ['roles', 'roles.permissions'],
    });

    return user;
  }

  public async create(data: RegisterInput): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });
    if (userExist)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.EMAIL_EXISTS,
          code: 409,
        },
        HttpStatus.BAD_REQUEST,
      );

    const hash = bcrypt.hashSync(
      data.password,
      this.config.get('saltRounds') || 7,
    );
    const normalRole = await this.roleService.getRoleByName(ROLES.STUDENT);
    if (!normalRole)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.ROLE_NOT_FOUND,
          code: 404,
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.userRepository.save({
      ...data,
      password: hash,
      roles: [normalRole],
    });
  }

  public async validateUser(data: LoginInput): Promise<UserOutputDto> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND_USER,
          code: 404,
        },
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.UNAUTHORIZED,
          code: 401,
        },
        HttpStatus.BAD_REQUEST,
      );
    return plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
  }

  public async verifyEmail(
    data: VerifyEmailInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    const { id, code } = data;
    const user = await this.userRepository.findOne({
      where: { _id: id },
    });
    if (!user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.UNAUTHORIZED,
          code: 401,
        },
        HttpStatus.BAD_REQUEST,
      );
    if (user.emailVerifyCode === code) {
      user.isVerifyEmail = true;
      user.emailVerifyCode = null;
    }
    await this.userRepository.save(user);
    const result = plainToInstance(UserOutputDto, user, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.VERIFY_SUCCESS,
      code: 200,
    };
  }

  public async resetPassword(
    userId: string,
    data: ResetPasswordInput,
  ): Promise<BaseApiResponse<null>> {
    const { password, code } = data;
    const user = await this.getUserByUserId(userId);
    if (!user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND_USER,
          code: 404,
        },
        HttpStatus.BAD_REQUEST,
      );
    if (code !== user.emailVerifyCode)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.INVALID_CODE,
          code: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    const hash = await bcrypt.hash(
      password,
      this.config.get('saltRounds') || 7,
    );
    await this.update(userId, {
      password: hash,
      emailVerifyCode: null,
    });
    return {
      error: false,
      data: null,
      message: MESSAGES.UPDATE_SUCCEED,
      code: 200,
    };
  }

  public async update(
    id: string,
    data: UpdateProfileDto,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    const user = await this.userRepository.findOne({
      where: {
        _id: id,
      },
    });
    if (!user)
      throw new HttpException(
        {
          error: true,
          message: MESSAGES.NOT_FOUND_USER,
          code: 404,
        },
        HttpStatus.BAD_REQUEST,
      );
    this.userRepository.merge(user, data);
    const updated = await this.userRepository.save(user);
    // create user into realtime service
    const result = plainToInstance(UserOutputDto, updated, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.UPDATE_SUCCEED,
      code: 200,
    };
  }

  public async updateProfile(
    id: string,
    data: UpdateUserInput,
  ): Promise<BaseApiResponse<UserOutputDto>> {
    const { address } = data;
    const user = await this.getUserByUserId(id);
    if (!user)
      throw new HttpException(
        {
          error: true,
          message: MESSAGES.NOT_FOUND_USER,
          code: 404,
        },
        HttpStatus.BAD_REQUEST,
      );
    this.userRepository.merge(user, data);
    const userAddr = await this.addressService.createAddress(address);
    const updated = await this.userRepository.save({
      ...user,
      address: userAddr,
    });
    // create user into realtime service
    const result = plainToInstance(UserOutputDto, updated, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.UPDATE_SUCCEED,
      code: 200,
    };
  }
}
