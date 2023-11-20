import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaymentService } from '../providers/payment.service';
import { Public, ReqUser } from '../../common';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CheckoutCartDto } from '../dto';
import { VnpayPaymentUrlDto } from '../dto/vnpay-payload.dto';

@Controller('')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/checkout')
  // @Redirect()
  @UseInterceptors(ClassSerializerInterceptor)
  async checkout(
    @ReqUser() ctx: RequestContext,
    @Body() data: CheckoutCartDto,
  ): Promise<any> {
    const url = await this.paymentService.checkout(ctx, data);
    return { url };
  }

  @Get('/vnpay-return')
  @Public()
  vnpayReturn(@Query() query: VnpayPaymentUrlDto) {
    return this.paymentService.webHook(query);
  }

  @Get('/vnpay_ipn')
  @Public()
  webHook(@Query() query: VnpayPaymentUrlDto) {
    return this.paymentService.webHook(query);
  }
}
