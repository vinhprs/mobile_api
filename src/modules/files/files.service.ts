import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { plainToInstance } from 'class-transformer';
import { BaseApiResponse } from 'src/shared/dtos';
import { UploadOutput } from './dto';
import { MESSAGES } from 'src/common/constants';
@Injectable()
export class FileService implements OnModuleInit {
  s3: S3;
  onModuleInit() {
    this.s3 = new S3();
  }
  constructor(private readonly configService: ConfigService) {}

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
