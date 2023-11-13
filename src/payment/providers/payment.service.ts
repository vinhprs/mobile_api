import { Injectable } from "@nestjs/common";
import { RequestContext } from "../../shared/request-context/request-context.dto";
import { CheckoutCartDto } from "../dto";
import { VNPayService } from "./vn-pay.service";
import { VnpayPaymentUrlDto } from "../dto/vnpay-payload.dto";

@Injectable()
export class PaymentService {
    constructor(
        // private readonly cartService: CartService,
        private readonly vnpayService: VNPayService
    ) {}

    checkout(
        ctx: RequestContext,
        data: CheckoutCartDto
    ): string {
        const { total } = data;
        const paymentUrl = this.vnpayService.createPaymentUrl(ctx.ip, total);
        return paymentUrl;
    }

    vnpayReturn(query: VnpayPaymentUrlDto) {
        const status = this.vnpayService.getPaymentStatus(query);
        return status;
    }

    webHook(query: VnpayPaymentUrlDto) {
        return this.vnpayService.webHook(query);
    }

}