import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { RegisterInput } from '../../../auth/dtos';
import { MESSAGES } from 'src/common/constants/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ROLES } from 'src/shared/enums';
import { RoleService } from './role.service';
import { UpdateProfileDto } from 'src/modules/profile/dto/update-profile.dto';
import { BaseApiResponse } from 'src/shared/dtos';
import { UserOutputDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private config: ConfigService,
    private readonly roleService: RoleService
  ) { }

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
          code: 1,
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
          code: 4,
        },
        HttpStatus.BAD_REQUEST,
      );
    return this.userRepository.save({
      ...data,
      password: hash,
      roles: [normalRole],
    });
  }

  public async update(
    id: string,
    data: UpdateProfileDto
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
          code: 4,
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
      code: 0,
    };
  }
}
