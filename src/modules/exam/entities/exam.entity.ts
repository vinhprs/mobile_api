import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn('increment')
  _id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'exam_title' })
  title!: string;

  @Column('int', { nullable: false, name: 'category_id' })
  categoryId: number;

  @Column('int', { nullable: false, name: 'sub_category_id' })
  subCategoryId: number;

  @Column('int', { nullable: false, name: 'time' })
  time!: number;

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

  @OneToMany(() => Question, (question) => question.exam, {
    cascade: ['insert', 'update', 'remove'],
  })
  questions: Question[];
}
