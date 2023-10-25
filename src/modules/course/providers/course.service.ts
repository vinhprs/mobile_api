import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { MESSAGES } from '../../../common/constants';
import { UserService } from '../../../modules/user/providers';
import { BaseApiResponse, BasePaginationResponse } from '../../../shared/dtos';
import { FileService } from '../../../shared/providers';
import { CourseOutput, CreateCourseDto } from '../dto';
import { FilterCourseDto } from '../dto/filter-course.dto';
import { Course } from '../entities';
import { SectionService } from './section.service';

@Injectable()
export class CourseService {
  DOMAIN = 'https://www.googleapis.com/youtube/v3';
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    private readonly sectionService: SectionService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
  ) {}

  // async crawlCourse(): Promise<any> {
  //   const lectures: any = await this.getCourses();
  //   const course = this.courseRepository.create();
  //   course.courseName = "Văn mẫu lớp 12 - Cô Ngọc Hà";
  //   course.description = "Khóa học giúp nắm chắc kiến thức nền tảng môn Ngữ văn 12 \nLàm tiền đề để phát triển kiến thức thi đại học sau này";
  //   course.price = 399000;
  //   course.expiredDate = new Date("2024-11-11");
  //   course.categoryId = 1;
  //   course.subCategoryId = 8;
  //   course.thumbnail_url = "https://i.ytimg.com/vi/XzjK-9q-hE8/hqdefault.jpg";
  //   course.teacherId = "84f9e0a8-af14-4fc9-9661-baea21aa7f37";
  //   const section1: any = {
  //     sectionName: "Chuyên đề 1. Nghị luận về một tư tưởng, đạo lí",
  //     lectures: []
  //   }
  //   const section2: any = {
  //     sectionName: "Chuyên đề 2. Nghị luận xã hội",
  //     lectures: []
  //   }
  //   const section3: any = {
  //     sectionName: "Chuyên đề 3. Nghị luận về một hiện tượng đời sống",
  //     lectures: []
  //   }
  //   const section4: any = {
  //     sectionName: "Chuyên đề 4. Nghị luận về một ý kiến bàn về văn học",
  //     lectures: []
  //   }
  //   const section5: any = {
  //     sectionName: "Chuyên đề 5. Nghị luận về một bài thơ, đoạn thơ",
  //     lectures: []
  //   }
  //   const section6: any = {
  //     sectionName: "Chuyên đề 6. Thực hành một số phép tu từ cú pháp",
  //     lectures: []
  //   }
  //   const sections = []
  //   for(let i=0; i< lectures.items.length; i++) {
  //     if(i <= 7)
  //       section1.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })

  //     else if(i >= 8 && i <= 14)
  //       section2.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })

  //     else if(i >= 15 && i <= 21)
  //       section3.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })

  //     else if(i >= 22 && i <= 28)
  //       section4.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })

  //     else if(i >= 29 && i <= 37)
  //       section5.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })

  //     else if(i >= 38 && i <= 43)
  //       section6.lectures?.push({
  //         lectureName: lectures?.items[i]?.snippet?.title,
  //         lectureType: LECTURE_TYPE.VIDEO,
  //         duration: lectures?.items[i]?.duration,
  //         url: lectures?.items[i]?.snippet?.resourceId.videoId
  //       })
  //   }
  //   sections.push(section1, section2, section3, section4, section5, section6);
  //   course.sections = sections;
  //   await this.courseRepository.save(course);
  // }

  async create(
    teacherId: string,
    data: CreateCourseDto,
    file: Express.Multer.File,
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
    const includeSections = this.sectionService.create(sections);
    if (file) {
      const uploaded = await this.fileService.uploadFile(
        course.courseName,
        file,
      );
      course.thumbnail_url = uploaded.location;
    }
    const createCourse = await this.courseRepository.save({
      ...course,
      sections: includeSections,
      teacherId,
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

  async filterCourses(
    filter: FilterCourseDto,
  ): Promise<BaseApiResponse<BasePaginationResponse<CourseOutput>>> {
    const {
      userId,
      categoryId,
      subCategoryId,
      startPrice,
      endPrice,
      skip,
      limit,
    } = filter;
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    if (userId) {
      const user = await this.userService.getUserByUserId(userId);
      if (!user)
        throw new HttpException(
          {
            error: true,
            data: null,
            message: MESSAGES.NOT_FOUND_USER,
            code: 404,
          },
          HttpStatus.NOT_FOUND,
        );
      const { subjects, grade } = user;
      queryBuilder.andWhere('course.subCategoryId IN (:...subCategoryId)', {
        subCategoryId: subjects,
      });
      queryBuilder.andWhere('course.categoryId = :categoryId', {
        categoryId: grade,
      });
    }
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
    if (skip) queryBuilder.skip(skip);
    if (limit) queryBuilder.take(limit);
    const [courses, count] = await queryBuilder.getManyAndCount();
    const result = plainToInstance(CourseOutput, courses, {
      excludeExtraneousValues: true,
    });
    return {
      error: false,
      data: {
        listData: result,
        total: count,
      },
      message: MESSAGES.GET_SUCCEED,
      code: 200,
    };
  }

  // async getCourses(): Promise<any> {
  //   const query: AxiosRequestYoutube = {
  //     playlistId: 'PLOVaCZ_HQkveHd4D6AQbROImCnUyhjQ31',
  //     key: 'AIzaSyCXgdDPtFNj4-HhXNcXgUV-hHDPjduv6mo',
  //     part: 'snippet',
  //     maxResults: 50,
  //   };
  //   const courses: any = await this.api.videoYoutube(
  //     this.DOMAIN,
  //     '/playlistItems',
  //     query,
  //   );
  //   await Promise.all(
  //     courses.items.map(async (course: any) => {
  //       const query: AxiosRequestYoutube = {
  //         key: 'AIzaSyCXgdDPtFNj4-HhXNcXgUV-hHDPjduv6mo',
  //         part: 'contentDetails',
  //         id: course.snippet.resourceId.videoId,
  //       };
  //       const videos = await this.api.videoYoutube(
  //         this.DOMAIN,
  //         '/videos',
  //         query,
  //       );
  //       course.duration = formatDuration(
  //         videos.items[0].contentDetails.duration,
  //       );
  //     }),
  //   );
  //   return courses;
  // }
}
