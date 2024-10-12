import { UserEntity } from "src/auth/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity( {name: 'errors'} )
export class ErrorEntitiy extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne( () => UserEntity, user => user.errors, {eager: false})
    user: UserEntity;

    @Column()
    userId: number;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    addAt: Date;
}