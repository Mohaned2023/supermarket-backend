import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, BaseEntity, OneToMany } from "typeorm";
import { accountType } from "../enums/account-type.enum";
import { ItemEntity } from "src/item/entities/item.entity";
import { InvoiceEntity } from "src/invoice/entities/invoice.entity";
import { ReturnedInvoiceEntity } from "src/returned-invoice/entities/returned-invoice.entity";
import { ErrorEntitiy } from "src/error/entities/error.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity  {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'This the username of the user.',
        example: 'mohaned',
    })
    @Column({unique: true})
    username: string;
    
    @ApiProperty({
        description: 'This is the display name.',
        example: 'Mohaned Sherhan (Mr.x)'
    })
    @Column()
    displayName: string;

    @Column()
    salt: string;

    @Column() 
    hashPassword: string;

    @ApiProperty({
        description: 'This is the Role of the account.',
        example: 'ACCOUNTANT',
        enum: accountType
    })
    @Column()
    accountType: accountType;

    @ApiProperty({
        description: 'This the date of creating the user.',
        example: new Date()
    })
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToMany( () => ItemEntity, item => item.user, {eager: false} ) 
    items: ItemEntity[];

    @OneToMany( () => InvoiceEntity, invoice => invoice.user, {eager: false} )
    invoices: InvoiceEntity[];

    @OneToMany( () => ReturnedInvoiceEntity, rInvoice => rInvoice.user, {eager: false})
    returnedInvoices: ReturnedInvoiceEntity[];

    @OneToMany( () => ErrorEntitiy, error => error.user, {eager: false})
    errors: ErrorEntitiy[];
}
