import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    _id!: string;

    @Column('varchar', { nullable: true, length: 255, name: 'fullname' })
    fullname!: string;
  
    @Column('varchar', { nullable: false, length: 255, name: 'email' })
    email!: string;

    @Column('varchar', { nullable: true, length: 255, name: 'username' })
    username?: string;
  
    @Column('varchar', { nullable: true, length: 255, name: 'phone' })
    phone?: string;

    @Column('integer', { nullable: true, name: 'gender' })
    gender?: number;

    @Column('date', { nullable: true, name: 'birth_date' })
    birthDate?: Date;

    @Column('boolean', {
        nullable: false,
        name: 'is_verify_email',
        default: false,
    })
    isVerifyEmail!: boolean;

    @Column('boolean', {
        nullable: false,
        name: 'is_accept_policy',
        default: false,
    })
    isAcceptPolicy!: boolean;

    @Column('varchar', { nullable: true, name: 'email_verify_code', length: 255 })
    emailVerifyCode?: string;

    @Column('varchar', { nullable: true, name: 'refresh_token' })
    refreshToken?: string;

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

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[];
}
