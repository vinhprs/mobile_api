import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { plainToInstance } from 'class-transformer';
import { BaseApiResponse } from 'src/shared/dtos';
import { UploadOutput, UploadVideoInput } from './dto';
import { MESSAGES } from 'src/common/constants';
import { Readable } from 'stream';
@Injectable()
export class FileService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}
  s3: AWS.S3;
  onModuleInit() {
    this.s3 = new AWS.S3({
      endpoint: this.configService.get<string>('do_endpoint'),
      s3ForcePathStyle: true,
      region: 'sgp1',
      credentials: {
        accessKeyId: this.configService.get<string>('do_access_key') || '',
        secretAccessKey: this.configService.get<string>('do_secret_key') || '',
      },
    });
  }
  async uploadFile(
    type: string,
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
      Bucket: this.configService.get('do_bucket') || '',
      Body: file.buffer,
      Key: `${type}/${identity}-${file.originalname}`,
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

  async uploadVideo(
    data: UploadVideoInput,
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
      Bucket: 'lectures',
      Body: file.buffer,
      Key: data.slug,
      ACL: 'public-read',
    };

    const uploadResult = await this.s3.upload(uploadParams).promise();
    console.log(uploadResult)
    const result = plainToInstance(UploadOutput, {
      key: uploadResult.Key,
      url: `https://prime-edu.sgp1.cdn.digitaloceanspaces.com/lectures/${data.slug}`,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.UPLOAD_IMAGE_SUCCES,
      code: 200,
    };
  }

  async getFileSize(key: string): Promise<number | undefined> {
    const data = await this.s3
      .headObject({
        Bucket: 'lectures',
        Key: key,
      })
      .promise();

    return data.ContentLength;
  }

  async getStreamFile(
    key: string,
    start?: number,
    end?: number,
  ): Promise<Readable> {
    const range = `bytes=${start}-${end}`;

    const res = await this.s3
      .getObject({
        Key: key,
        Bucket: 'lectures',
        Range: range,
      })
      .promise();
    const body = res.Body as Buffer;
    return Readable.from(Buffer.from(body));
  }
}
