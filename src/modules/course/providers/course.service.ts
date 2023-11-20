import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { MESSAGES } from '../../../common/constants';
import { UserService } from '../../../modules/user/providers';
import { BaseApiResponse, BasePaginationResponse } from '../../../shared/dtos';
import { CourseOutput, CreateCourseDto } from '../dto';
import {
  FilterCourseDto,
  TeacherFilterCourses,
} from '../dto/filter-course.dto';
import { Course } from '../entities';
import { SectionService } from './section.service';
import { CategoryService } from '../../../modules/category/category.service';
import { CategoryOutput } from 'src/modules/category/dto';
import { PublicCourseInput } from '../dto/public-course-input.dto';
import { CartService } from '../../../modules/cart/cart.service';

@Injectable()
export class CourseService {
  DOMAIN = 'https://www.googleapis.com/youtube/v3';
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly sectionService: SectionService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    @Inject(forwardRef(() => CartService))
    private readonly cartService: CartService,
  ) {}

  async getCourseById(_id: number): Promise<BaseApiResponse<CourseOutput>> {
    const course = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.sections', 'sections')
      .leftJoinAndSelect('sections.lectures', 'lectures')
      .andWhere('course._id = :_id', { _id })
      .getOne();
    const result = plainToInstance(CourseOutput, course, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: result,
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }

  async create(
    teacherId: string,
    data: CreateCourseDto,
  ): Promise<BaseApiResponse<CourseOutput>> {
    const teacher = await this.userService.getUserByUserId(teacherId);
    if (!teacher)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND_USER,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    const { sections } = data;
    const course = this.courseRepository.create(data);
    const [includeSections, totalDuration] =
      this.sectionService.create(sections);
    const createCourse = await this.courseRepository.save({
      ...course,
      sections: includeSections,
      teacherId,
      totalDuration,
    });
    const result = plainToInstance(CourseOutput, createCourse, {
      excludeExtraneousValues: true,
    });

    return {
      error: false,
      data: result,
      message: MESSAGES.CREATED_SUCCEED,
      code: 200,
    };
  }

  async publicCourse(data: PublicCourseInput): Promise<BaseApiResponse<null>> {
    const { courseId, isPublic } = data;
    const course = await this.courseRepository.findOne({
      where: { _id: courseId },
    });
    if (!course)
      throw new HttpException(
        {
          error: true,
          data: null,
          message: MESSAGES.NOT_FOUND,
          code: 404,
        },
        HttpStatus.NOT_FOUND,
      );
    await this.courseRepository.update(
      { _id: courseId },
      {
        isPublic,
      },
    );
    return {
      error: false,
      data: null,
      message: MESSAGES.UPDATE_SUCCEED,
      code: 200,
    };
  }

  async teacherGetCourse(
    teacherId: string,
    filter: TeacherFilterCourses,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    const { search, page, limit } = filter;
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    queryBuilder.andWhere('course.teacherId = :teacherId', { teacherId });
    if (search)
      queryBuilder.andWhere(
        'UPPER(course.courseName) LIKE UPPER(:courseName)',
        {
          courseName: `%${search}%`,
        },
      );
    if (page) queryBuilder.skip((page - 1) * limit);
    if (limit) queryBuilder.take(limit);
    const [courses, count] = await queryBuilder.getManyAndCount();
    const instance = plainToInstance(CourseOutput, courses, {
      excludeExtraneousValues: true,
    });

    // Get category info
    await Promise.all(
      instance.map(async (course) => {
        const [category, subCategory] = await Promise.all([
          this.categoryService.getCategoryById(course.categoryId),
          this.categoryService.getCategoryById(course.subCategoryId),
        ]);
        course.category = plainToInstance(CategoryOutput, category);
        course.subCategory = plainToInstance(CategoryOutput, subCategory);
      }),
    );
    const result = plainToInstance(CourseOutput, instance, {
      excludeExtraneousValues: true,
    });

    return {
      error: false,
      data: {
        listData: result,
        total: count,
        totalPage: Math.ceil(count / limit),
      },
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }

  async filterCourses(
    filter: FilterCourseDto,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    const {
      categoryId,
      subCategoryId,
      startPrice,
      endPrice,
      page,
      limit,
      search,
      startDuration,
      endDuration,
      userId,
    } = filter;
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    queryBuilder.andWhere('course.isPublic = TRUE');
    if (search)
      queryBuilder.andWhere(
        'UPPER(course.courseName) LIKE UPPER(:courseName)',
        {
          courseName: `%${search}%`,
        },
      );
    if (categoryId)
      queryBuilder.andWhere('course.categoryId = :categoryId', { categoryId });
    if (subCategoryId)
      queryBuilder.andWhere('course.subCategoryId IN (:...subCategoryId)', {
        subCategoryId,
      });
    if (startPrice && endPrice)
      queryBuilder.andWhere(
        'course.price >= :startPrice AND course.price <= :endPrice',
        {
          startPrice: startPrice * 1000,
          endPrice: endPrice * 1000,
        },
      );
    if (startDuration && endDuration)
      queryBuilder.andWhere(
        'course.total_duration >= :startDuration AND course.total_duration <= :endDuration',
        {
          startDuration: startDuration * 60,
          endDuration: endDuration * 60,
        },
      );
    if (page) queryBuilder.skip((page - 1) * limit);
    if (limit) queryBuilder.take(limit);
    const [courses, count] = await queryBuilder.getManyAndCount();
    const instance = plainToInstance(CourseOutput, courses);
    // Get category info
    await Promise.all(
      instance.map(async (course) => {
        const [category, subCategory] = await Promise.all([
          this.categoryService.getCategoryById(course.categoryId),
          this.categoryService.getCategoryById(course.subCategoryId),
        ]);
        course.category = plainToInstance(CategoryOutput, category);
        course.subCategory = plainToInstance(CategoryOutput, subCategory);
        if (userId) {
          const paidCart = await this.cartService.getPaidCart(
            userId,
            course._id,
          );
          course.isPaid = paidCart?.data?.status || false;
          course.isAddToCart = paidCart?.data ? true : false;
        }
      }),
    );
    const result = plainToInstance(CourseOutput, instance, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: {
        listData: result,
        total: count,
        totalPage: Math.ceil(count / limit),
      },
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }
}
