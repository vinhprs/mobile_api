import { Module } from '@nestjs/common';
import * as providers from './providers';
import * as controllers from './controllers';
import { CommonModule } from '../common';
import { CartModule } from 'src/modules/cart/cart.module';

@Module({
  imports: [
    CommonModule,
    CartModule
  ],
  controllers: Object.values(controllers),
  providers: Object.values(providers),
  exports: Object.values(providers)
})
export class PaymentModule {}
