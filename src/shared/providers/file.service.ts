import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { plainToInstance } from 'class-transformer';
import { FileOutput } from '../dtos';
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
  ): Promise<FileOutput> {
    const uploadParams = {
      Bucket: this.configService.get('aws_bucket_name') || '',
      Body: file.buffer,
      Key: `courses/${identity}/${file.originalname}`,
    };

    const updatedParams = Object.assign({}, uploadParams, {
      name: `${identity}/${file.originalname}`,
      ACL: 'public-read',
    });

    const uploadResult = await this.s3.upload(updatedParams).promise();
    return plainToInstance(FileOutput, {
      name: updatedParams.name,
      src: 'courses',
      location: uploadResult.Location,
      alt: updatedParams.name,
    });
  }
}
