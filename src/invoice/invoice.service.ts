import { 
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { In, Repository } from 'typeorm';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { ItemEntity } from 'src/item/entities/item.entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { 
    DataInvoiceReportInterface,
    InvoiceReportInterface,
    ItemInterface,
    UpdateInvoiceIterface
} from 'src/interfaces/interfaces';
import { readFileSync } from 'fs'; 
import { omitObjectKeys } from 'src/utils/omit.util';
import { ItemService } from 'src/item/item.service';
import { ErrorService } from 'src/error/error.service';

@Injectable()
export class InvoiceService {
    constructor( 
        @InjectRepository(InvoiceEntity) private readonly invoiceRepository: Repository<InvoiceEntity>,
        @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>,
        private readonly itemService: ItemService,
        private readonly errorService: ErrorService
    ) {}

    private readonly logger = new Logger('InvoiceService');

    /**
     * This function use to create an invoice.
     * @param {CreateInvoiceDto} createInvoiceDtos The invoice information.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<InvoiceEntity>} The invoice.
     * ### Exceptions:
     * - NotFoundException - One of the items not found.
     * - HttpException - The number of items in the invoice is lass than in the database.
     */
    async createInvoice( createInvoiceDtos: CreateInvoiceDto[], user: UserEntity ): Promise<InvoiceEntity> {
        let invoice = new InvoiceEntity();
        let items: ItemInterface[] = [];
        let totalPrice: number = 0;
        let itemsIds: number[] = [];
        let itemIdError: number = undefined;

        createInvoiceDtos.forEach( (cid) => itemsIds.push(cid.itemId) );
        const itemsInfo: ItemEntity[] = await this.itemRepository.find({where: { itemId: In(itemsIds) } });
        const notFoundItemId: number | undefined = itemsIds.filter( (id) => itemsInfo.findIndex( (i) => i.itemId === id ) === -1 )[0] ;
        if ( notFoundItemId ) throw new NotFoundException(`The item with id '${notFoundItemId}' Not Found!`);

        createInvoiceDtos.forEach( (cid) => {
            const { itemId } = cid 
            const i: number = itemsInfo.findIndex( (value) => value.itemId == itemId );
            const item = itemsInfo[i];
            if ( item.numberOfItems < cid.numberOfItems ) this.errorService.create( `Number of Item With ID '${itemId}' is lass than the Number of Items in the Database!`, user);
            this.itemService.updateNumberOfItems( itemId, cid.numberOfItems, true, user );
            items.push({
                itemId,
                name: item.name,
                numberOfItems: cid.numberOfItems,
                price: item.sellPillPrice
            })
            totalPrice += cid.numberOfItems * item.sellPillPrice 
        });
        if ( itemIdError ) throw new HttpException(`The number of items in the item with id '${itemIdError}' is lass than the number of items in the body!`, HttpStatus.BAD_REQUEST);
        invoice.items = items ;
        invoice.totalPrice = totalPrice;
        invoice.user = user;
        await invoice.save();
        this.logger.log(`The ${user.accountType} '${user.username}' Create New Invoice With ID '${invoice.id}'.`);
        invoice.user = omitObjectKeys(invoice.user, ['accountType', 'hashPassword', 'salt', 'createdAt']) as UserEntity ;
        return invoice;
    }

    /**
     * This function use to find an invoice.
     * @param {number} invoiceId The Invoice ID.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<InvoiceEntity>} The invoice.
     * ### Exceptions:
     * - NotFoundException - The invoice not found.
     */
    async findInvoice( invoiceId: number, user: UserEntity ): Promise<InvoiceEntity> {
        const invoice: InvoiceEntity = await this.invoiceRepository.findOne( { where: {id: invoiceId}, relations: ['user'] });
        if ( !invoice ) throw new NotFoundException();
        this.logger.log(`The ${user.accountType} '${user.username}' Get The Info of The Invoice With ID '${invoiceId}'.`);
        invoice.user = omitObjectKeys(invoice.user, ['accountType', 'hashPassword', 'salt', 'createdAt']) as UserEntity ;
        return invoice;
    }

    /**
     * This function use to delete an invoice.
     * @param {number} invoiceId The invoice ID.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<{ message: string }>} The OK message.
     * ### Exceptions:
     * - NotFoundException - The invoice not found.
     */
    async deleteInvoice( invoiceId: number, user: UserEntity): Promise<{ message: string }>{
        const result = await this.invoiceRepository.delete( {id: invoiceId} ) ;
        if ( result.affected === 0 ) throw new NotFoundException();
        this.logger.log(`The ${user.accountType} '${user.username}' Delete The Invoice With ID '${invoiceId}'.`);
        return { message: `The Invoice With ID '${invoiceId}' Has Been Deleted.` };
    }

    /**
     * This function use to update an invoice information.
     * @param {number} invoiceId The invoice ID.
     * @param {UpdateInvoiceIterface} updateInvoice The new invoice information. 
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<{ message: string }>} The OK message.
     * ### Exceptions:
     * - NotFoundException - The invoice not found.
     */
    async updateInvoice( invoiceId: number, updateInvoice: UpdateInvoiceIterface, user: UserEntity ): Promise<{message: string}> {
        const invoice: InvoiceEntity = await this.invoiceRepository.findOne({where: {id: invoiceId}}) ;
        if ( !invoice ) throw new NotFoundException();
        invoice.items = updateInvoice.items;
        invoice.totalPrice = updateInvoice.totalPrice;
        await invoice.save();
        this.logger.log(`The ${user.accountType} '${user.username}' Updated The Invoice With ID '${invoiceId}'.`);
        return { message: 'Invoice Updated.' };
    }

    /**
     * This function use to get the invoices report.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<InvoiceReportInterface>} The report.
     */
    async getInvoiceReport( user: UserEntity ): Promise<InvoiceReportInterface> {
        const sql: string = readFileSync('./sql/invoices-report.sql', 'utf-8' ) ;
        const reportObject: DataInvoiceReportInterface[] = ( await this.invoiceRepository.query(sql) ) as DataInvoiceReportInterface[] ;
        this.logger.log(`The ${user.accountType} '${user.username}' Created Invoices Report.`);
        const omitUser: UserEntity = omitObjectKeys(
            user,
            ['hashPassword','salt', 'createdAt']
        ) as UserEntity;
        return { 
            report: reportObject[0],
            user: omitUser,
            createAt: new Date() 
        };
    }
}