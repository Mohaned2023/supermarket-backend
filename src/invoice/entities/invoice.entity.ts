import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/auth/entities/user.entity";
import { ItemInterface } from "src/interfaces/interfaces";
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";


@Entity({ name: 'invoices' })
export class InvoiceEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({
        description: 'List of the items',
        example: [
            {
                itemId: 1,
                name: "X Chocolate",
                numberOfItems: 2,
                price: 30.5,
            }
        ]
    })
    @Column('json')
    items: ItemInterface[] ;

    @ApiProperty({
        description: 'The Total Price.',
        example: 30.5
    })
    @Column('float')
    totalPrice: number;

    @ManyToOne( () => UserEntity, user => user.invoices, {eager: false} )
    user: UserEntity;

    @Column()
    userId: number;

    @ApiProperty({
        description: 'The Invoice Date.',
        example: new Date()
    })
    @CreateDateColumn( { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } )
    addAt: Date;
}
