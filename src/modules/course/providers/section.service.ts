import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from '../entities';
import { Repository } from 'typeorm';
import { CreateSection } from '../dto';
import { LectureService } from './lecture.service';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly lectureService: LectureService,
  ) {}

  create(data: CreateSection[]): Section[] {
    const sections: Section[] = [];
    data.map((section) => {
      const createSection = this.sectionRepository.create(section);
      createSection.lectures = this.lectureService.create(section.lectures);
      sections.push(createSection);
    });
    return sections;
  }
}
