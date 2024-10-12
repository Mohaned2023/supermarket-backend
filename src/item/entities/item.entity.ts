import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/auth/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity( {name: 'items'} )
export class ItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number; 

    @ApiProperty({
        description: 'The itme id.',
        example: 1
    })
    @Column({unique: true})
    itemId: number;

    @ApiProperty({
        description: 'The name of the item.',
        example: "X Chocolate"
    })
    @Column()
    name: string;

    @ApiProperty({
        description: 'Selling price of one piece.',
        example: 4.6
    })
    @Column({type: 'double precision'})
    sellPillPrice: number;

    @ApiProperty({
        description: 'Purchase price of one piece.',
        example: 3.6
    })
    @Column({type: 'double precision'})
    buyPillPrice: number;

    @ApiProperty({
        description: 'The Number of all pieces.',
        example: 45
    })
    @Column({type: 'double precision'})
    numberOfItems: number;

    @Column({type: 'double precision'})
    sellAllItemsPrice: number;

    @Column({type: 'double precision'})
    buyAllItemsPrice: number;

    @ApiProperty({
        description: 'The Company name.',
        example: 'X Company'
    })
    @Column()
    companyName: string;

    @ApiProperty({
        description: 'Production Date.',
        example: new Date()
    })
    @Column()
    productionDate: Date;

    @ApiProperty({
        description: 'Expiry Date.',
        example: new Date()
    })
    @Column()
    expiryDate: Date;

    @ApiProperty({
        description: 'The time of inserting the item.',
        example: new Date()
    })
    @CreateDateColumn( {type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    addAt: Date

    @ManyToOne( () => UserEntity, user => user.items, {eager: false})
    user: UserEntity;
    
    @Column()
    userId: number;
}
