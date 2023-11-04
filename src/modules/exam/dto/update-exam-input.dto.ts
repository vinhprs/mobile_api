import { PartialType } from '@nestjs/swagger';
import { CreateExamDto } from './create-exam-input.dto';

export class UpdateExamDto extends PartialType(CreateExamDto) {}
