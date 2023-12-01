import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from '../entities';
import { Repository } from 'typeorm';
import { CreateLecture, LectureOutput } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ) {}

  create(data: CreateLecture[]): Lecture[] {
    const lectures: Lecture[] = [];
    data.map((lecture) => {
      const createLecture = this.lectureRepository.create(lecture);
      lectures.push(createLecture);
    });
    return lectures;
  }

  async getAll(): Promise<LectureOutput[]> {
    const data = await this.lectureRepository.find({});

    return plainToInstance(LectureOutput, data, {
      excludeExtraneousValues: true,
    });
  }
}
