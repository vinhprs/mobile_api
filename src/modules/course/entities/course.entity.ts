import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Section } from './section.entity';
import { CourseBookmark } from '../../../modules/course-bookmark/entities';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  _id!: number;

  @Column('varchar', { nullable: false, length: 255, name: 'course_name' })
  courseName!: string;

  @Column('text', { nullable: true, name: 'description' })
  description: string;

  @Column('int', { nullable: false, name: 'price' })
  price!: number;

  @Column('text', { nullable: true, name: 'thumbnail_url' })
  thumbnail_url: string;

  @Column('date', { nullable: true, name: 'expired_date' })
  expiredDate: Date;

  @Column('int', { nullable: true, name: 'category_id' })
  categoryId: number;

  @Column('int', { nullable: true, name: 'sub_category_id' })
  subCategoryId: number;

  @Column('varchar', { nullable: false, name: 'teacher_id' })
  teacherId: string;

  @Column('boolean', { nullable: false, name: 'is_public', default: false })
  isPublic!: boolean;

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

  @OneToMany(() => Section, (section) => section.course, {
    eager: true,
    cascade: ['insert', 'update', 'remove'],
  })
  sections: Section[];

  @OneToMany(() => CourseBookmark, (bookmark) => bookmark.course, {
    cascade: ['remove'],
    orphanedRowAction: 'delete',
  })
  bookmarks: CourseBookmark[];
}
