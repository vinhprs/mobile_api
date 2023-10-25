import { Section } from '.';
import { LECTURE_TYPE } from '../../../shared/enums';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn('increment')
  _id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'lecture_name' })
  lectureName!: string;

  @Column({
    type: 'enum',
    enum: LECTURE_TYPE,
    name: 'lecture_type',
  })
  lectureType: LECTURE_TYPE;

  @Column('int', { nullable: true, name: 'duration' })
  duration: number;

  @Column('varchar', { nullable: false, name: 'url' })
  url: string;

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

  @ManyToOne(() => Section, (section) => section.lectures)
  section: Section;
}
