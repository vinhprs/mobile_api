import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import {
  ANSWER_TYPE,
  QUESTION_LEVEL,
} from '../../../shared/enums/question-level.enum';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('increment')
  _id!: number;

  @Column('varchar', { nullable: false, name: 'question_title' })
  title!: string;

  @Column({
    type: 'enum',
    enum: QUESTION_LEVEL,
    name: 'question_level',
  })
  questionLevel: QUESTION_LEVEL;

  @Column({
    type: 'enum',
    enum: ANSWER_TYPE,
    name: 'answer_type',
    default: ANSWER_TYPE.SINGLE,
  })
  answerType: ANSWER_TYPE;

  @Column('varchar', { nullable: false, name: 'answers', array: true })
  answers: string[];

  @Column('int', { nullable: false, name: 'correct_answers', array: true })
  correctAnswers: number[];

  @Column('text', { nullable: true, name: 'answer_explain' })
  explain: string;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @ManyToOne(() => Exam, (exam) => exam.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;
}
