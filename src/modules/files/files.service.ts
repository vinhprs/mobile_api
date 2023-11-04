import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk'
import { S3 } from 'aws-sdk';
import { plainToInstance } from 'class-transformer';
import { BaseApiResponse } from 'src/shared/dtos';
import { UploadOutput } from './dto';
import { MESSAGES } from 'src/common/constants';
@Injectable()
export class FileService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  s3: S3;
  onModuleInit() {
    AWS.config.region = this.configService.get('aws_region');
    AWS.config.accessKeyId = this.configService.get('aws_access_key_id');
    AWS.config.secretAccessKey = this.configService.get('aws_secrect_key');
    this.s3 = new AWS.S3();
  }
  async uploadFile(
    identity: number | string,
    file: Express.Multer.File,
  ): Promise<BaseApiResponse<UploadOutput>> {
    if (!file)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 400,
        },
        HttpStatus.BAD_REQUEST,
      );
    const uploadParams = {
      Bucket: this.configService.get('aws_bucket_name') || '',
      Body: file.buffer,
      Key: `images/${identity}/${file.originalname}`,
      ACL: 'public-read',
    };

    const uploadResult = await this.s3.upload(uploadParams).promise();
    const result = plainToInstance(UploadOutput, {
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.UPLOAD_IMAGE_SUCCES,
      code: 200,
    };
  }
}
