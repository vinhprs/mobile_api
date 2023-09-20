import type { OnModuleInit } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ISampleInterface } from './interfaces/sample.interface';

@Injectable()
export class AppService implements OnModuleInit {
  private sampleService: ISampleInterface;

  constructor(@Inject('SAMPLE_PACKAGE') private readonly client: ClientGrpc) {}

  getSayHello() {
    return this.sampleService?.sayHello({});
  }

  onModuleInit(): any {
    this.sampleService =
      this.client.getService<ISampleInterface>('SampleService');
  }
}
