import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/auth/entities/user.entity";
import { ItemInterface } from "src/interfaces/interfaces";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity( { name: 'returned_invoices' } ) 
export class ReturnedInvoiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The items.',
        example: [{
            itemId: 1,
            name: "X Chocolate",
            numberOfItems: 2,
            price: 30.5,
        }]
    })
    @Column('json')
    items: ItemInterface[] = [];

    @ApiProperty({
        description: 'The Total Price.',
        example: 30.5
    })
    @Column('float')
    totalPrice: number = 0;

    @ApiProperty({
        description: 'The Invoice Date.',
        example: new Date()
    })
    @CreateDateColumn( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    addAt: Date;

    @ManyToOne( () => UserEntity, user => user.returnedInvoices, {eager: false} )
    user: UserEntity;

    @Column()
    userId: number;
}