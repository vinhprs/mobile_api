import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto';
import { BaseApiResponse } from '../../shared/dtos';
import { UserService } from '../user/providers';
import { CourseService } from '../course/providers';
import { MESSAGES } from '../../common/constants';
import { CartOutput, SummaryCartOutput } from './dto/cart-output.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
    private readonly courseService: CourseService
  ) {}

  async getMyCart(
    userId: string
  ): Promise<BaseApiResponse<SummaryCartOutput>> {
    const user = await this.userService.getUserByUserId(userId);
    if(!user) 
      throw new HttpException(
        {
          error: true, 
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404
        },
        HttpStatus.NOT_FOUND
      );
    const carts = await this.cartRepository.createQueryBuilder('cart')
    .leftJoinAndSelect('cart.course', 'course')
    .andWhere('cart.user_id = :user_id', { user_id: userId })
    .andWhere('cart.status = :status', { status: false })
    .getMany();
    const cartOutput = plainToInstance(CartOutput, carts, {excludeExtraneousValues: true});

    const originalPrice = carts.reduce((total, current) => {
      const price = current.course.price;
      return total + price;
    }, 0)
    const total = carts.reduce((total, current) => {
      const price = current.course.price;
      const discount = current.discount;
      const afterDiscount = (price - (price * discount / 100))
      return total + afterDiscount
    }, 0)

    const result = plainToInstance(SummaryCartOutput, {
      originalPrice,
      total,
      carts: cartOutput
    })
    return {
      error: false,
      data: result,
      message: MESSAGES.GET_SUCCEED,
      code: 200
    }
  }
    
  async addToCart(
    userId: string,
    data: CreateCartDto
  ): Promise<BaseApiResponse<null>> {
    const { courseId } = data; 
    const [user, course] = await Promise.all([
      this.userService.getUserByUserId(userId),
      this.courseService.getCourseById(courseId)
    ]);

    if(!user || !course.data) 
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404
        },
        HttpStatus.NOT_FOUND
      )
    const newCart = this.cartRepository.create();
    await this.cartRepository.save({
      ...newCart,
      user,
      course: course.data
    });
    
    return {
      error: false,
      data: null,
      message: MESSAGES.ADD_CART_SUCCEED,
      code: 200
    }
  }

  async removeCart(
    id: number,
    userId: string
  ): Promise<BaseApiResponse<null>> {
    const cart = await this.cartRepository.findOne({ 
      where: {_id: id},
      relations: ['user']
    });
    if(!cart)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404
        },
        HttpStatus.NOT_FOUND
      );

    if(cart.user._id !== userId) 
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.UNAUTHORIZED,
          code: 404
        },
        HttpStatus.UNAUTHORIZED
      );
    await this.cartRepository.remove(cart);
    return {
      error: false,
      data: null,
      message: MESSAGES.DELETE_SUCCEED,
      code: 200
    }
  }
}
