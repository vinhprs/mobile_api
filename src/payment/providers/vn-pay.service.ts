import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VnpayPaymentUrlDto } from '../dto/vnpay-payload.dto';
import moment from 'moment';
import { sortObject } from '../../shared/utils/object.util';
import { DeepPartial } from 'typeorm';
import queryString from 'qs';
import crypto from 'crypto';
@Injectable()
export class VNPayService {
    constructor(
        private readonly configService: ConfigService
    ) {}

    createPaymentUrl(
        ipAddr: string | undefined,
        total: number
    ): string {
        const date = new Date();
        let orderId = moment(date).format('DDHHmmss');
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        const secretKey = this.configService.get('vnp_hash_secrect');
        const vnpUrl = this.configService.get('vnp_url');

        let payload: DeepPartial<VnpayPaymentUrlDto> = {
            vnp_Version: this.configService.get('vnp_version') || "",
            vnp_Command: this.configService.get('vnp_command') || "",
            vnp_TmnCode: this.configService.get('vnp_tmncode') || "",
            vnp_Locale: this.configService.get("vnp_locale") || "",
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán cho Prime Edu mã GD: ${orderId}`,
            vnp_OrderType: 'other',
            vnp_Amount: total * 100,
            vnp_ReturnUrl: this.configService.get('vnp_return_url') || "",
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        }

        payload = sortObject(payload);
        const signData = queryString.stringify(payload, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        payload.vnp_SecureHash = signed;
        
        const paymentUrl = vnpUrl + '?' + queryString.stringify(payload, { encode: false });
        return paymentUrl;
    }

    getPaymentStatus(
        query: VnpayPaymentUrlDto
    ) {
        const secureHash = query.vnp_SecureHash;
        const secretKey = this.configService.get('vnp_hash_secrect');
        delete query.vnp_SecureHash;
        delete query.vnp_SecureHashType;
        query = sortObject(query);
        const signData = queryString.stringify(query, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");    
         
        return secureHash === signed ? true : false;
    }

    webHook(query: VnpayPaymentUrlDto) {
        const status = this.getPaymentStatus(query);
        if(status) {
            const orderId = query.vnp_TxnRef;
            console.log(orderId);
            const resCode = query.vnp_ResponseCode;
            return resCode;
        } else {
            return false;
        }
    }
}
