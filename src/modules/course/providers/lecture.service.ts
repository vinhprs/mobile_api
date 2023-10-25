import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from '../entities';
import { Repository } from 'typeorm';
import { CreateLecture } from '../dto';

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
}
