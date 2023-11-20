import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderDetail } from './entities';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { CartInfoDto, CheckoutCartDto } from '../../payment/dto';
import { OrderOutput } from './dto/order-output.dto';
import { plainToInstance } from 'class-transformer';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { UserService } from '../user/providers';
import { MESSAGES } from '../../common/constants';
import { BaseApiResponse } from '../../shared/dtos';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    private readonly cartService: CartService,
    private readonly userService: UserService,
  ) {}

  async updatePaymentStatus(_id: number): Promise<void> {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.orderDetails', 'detail')
      .leftJoinAndSelect('detail.cart', 'cart')
      .andWhere('order._id = :_id', { _id })
      .getOne();

    if (!order)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    order.paymentStatus = true;
    await Promise.all(
      order.orderDetails.map(async (detail) => {
        await this.cartService.updateCartStatus(detail.cart);
      }),
    );
    await this.orderRepository.save(order);
  }

  async getOrderById(id: number): Promise<BaseApiResponse<OrderOutput>> {
    const order = await this.orderRepository.findOne({
      where: { _id: id },
    });

    const result = plainToInstance(OrderOutput, order, {
      excludeExtraneousValues: true,
    });

    return {
      error: false,
      data: result,
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }

  async createOrderDetail(data: CartInfoDto[]): Promise<OrderDetail[]> {
    const bulkDetail: OrderDetail[] = [];
    await Promise.all(
      data.map(async (item) => {
        const cart = await this.cartService.getCartById(item.cartId);
        const orderDetail = this.orderDetailRepository.create({
          cart,
          price: item.price,
        });
        bulkDetail.push(orderDetail);
      }),
    );
    return bulkDetail;
  }

  async createOrder(
    ctx: RequestContext,
    data: CheckoutCartDto,
    total: number,
  ): Promise<OrderOutput> {
    const user = await this.userService.getUserByUserId(ctx.user.id);
    if (!user)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    const orderDetails = await this.createOrderDetail(data.items);
    const order = this.orderRepository.create({
      ...data,
      orderDetails,
      user,
      total,
    });
    const created = await this.orderRepository.save(order);

    return plainToInstance(OrderOutput, created, {
      excludeExtraneousValues: true,
    });
  }
}
