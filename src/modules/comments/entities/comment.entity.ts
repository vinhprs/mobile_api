import { Lecture } from "../../../modules/course/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    _id!: string;

    @Column('varchar', { nullable: false, name: 'author_name' })
    author: string;

    @Column('text', { nullable: false, name: 'author_thumbnail' })
    authorThumbnail: string;

    @Column('text', { nullable: false, name: 'content' })
    content: string;

    @Column('timestamp', {
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    })
    createdAt!: Date;

    @ManyToOne(() => Lecture, lecture => lecture.comments)
    @JoinColumn({name: 'lecture_id'})
    lecture: Lecture;
}
