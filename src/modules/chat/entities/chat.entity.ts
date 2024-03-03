import { Course } from '../../../modules/course/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('increment')
  _id!: number;

  @Column('varchar', { nullable: false, name: 'members', array: true })
  members: string[];

  @ManyToOne(() => Course, (course) => course.chat)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Message, (msg) => msg.chat)
  messages: Message[];

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
}
