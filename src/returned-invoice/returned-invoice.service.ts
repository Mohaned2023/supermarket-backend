import { 
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReturnedInvoiceEntity } from './entities/returned-invoice.entity';
import { Repository } from 'typeorm';
import { CreateReturnedInvoiceDto } from './dtos/create-returned-invoice.dto';
import { InvoiceService } from 'src/invoice/invoice.service';
import { UserEntity } from 'src/auth/entities/user.entity';
import { 
    DataInvoiceReportInterface,
    InvoiceReportInterface,
    ItemInterface
} from 'src/interfaces/interfaces';
import { omitObjectKeys } from 'src/utils/omit.util';
import { ItemService } from 'src/item/item.service';
import { readFileSync } from 'fs';

@Injectable()
export class ReturnedInvoiceService {

    constructor( 
        @InjectRepository(ReturnedInvoiceEntity) private readonly rInvoiceRepository: Repository<ReturnedInvoiceEntity>,
        private readonly invoiceService: InvoiceService,
        private readonly itemService: ItemService
    ) {}

    private readonly logger = new Logger('RetrunedInvoiceService');

    /**
     * This function use to create returned invoice in the database.
     * @param {number} invoiceId The ID of the invoice.
     * @param {CreateReturnedInvoiceDto} crid The returned invoice information.
     * @param {UserEntity} user The user who call this function.
     * @returns {ReturnedInvoiceEntity} The returend invoice.
     * ### Exceptions: 
     * - HttpException - No items or number of items is greater than number of items in the invoice.
     * - NotFoundException - Item not found in the database.
     * - HttpException - The number of pills greater than The number of pills in the invoice.
     */
    async create( invoiceId: number, crid: CreateReturnedInvoiceDto[], user: UserEntity): Promise<ReturnedInvoiceEntity> {
        if (crid.length === 0) throw new HttpException('There is no items in the body!', HttpStatus.BAD_REQUEST);
        const invoice = await this.invoiceService.findInvoice( invoiceId, user );
        if ( crid.length > invoice.items.length ) throw new HttpException(`The number of items is greater than the number of items in the invoice with id '${invoiceId}'!`, HttpStatus.BAD_REQUEST);
        let itemError: CreateReturnedInvoiceDto = undefined;
        let notFoundItemId: number = undefined;
        let returnedInvoice: ReturnedInvoiceEntity = this.rInvoiceRepository.create();
        crid.forEach( ( item ) => {
            const i: number = invoice.items.findIndex( ( value: ItemInterface ) => value.itemId ===  item.itemId );
            if ( i < 0 ) {
                notFoundItemId = item.itemId ;
                return;
            }
            let { numberOfItems } = invoice.items[i];
            if ( numberOfItems < item.numberOfItems ) {
                itemError = item ;
                return;
            }
            this.itemService.updateNumberOfItems( item.itemId, item.numberOfItems, false, user );
            numberOfItems -= item.numberOfItems;
            invoice.items[i].numberOfItems = numberOfItems;
            returnedInvoice.items.push(  { ...invoice.items[i], numberOfItems: item.numberOfItems }  );
            returnedInvoice.totalPrice += invoice.items[i].price * item.numberOfItems ;
            invoice.totalPrice -= item.numberOfItems * invoice.items[i].price ;
            if ( numberOfItems === 0 ) invoice.items.splice(i, 1);
        });
        if ( notFoundItemId ) throw new NotFoundException(`The item with id '${notFoundItemId}' is not found in the invoice with id '${invoiceId}'!`); 
        if ( itemError ) throw new HttpException(`The numberOfItems in the item with id '${itemError.itemId}' is greater than the numberOfItems in the invoice with id '${invoiceId}'!`, HttpStatus.BAD_REQUEST);
        if ( invoice.items.length === 0 ) this.invoiceService.deleteInvoice( invoiceId, user );
        else this.invoiceService.updateInvoice( invoiceId, { items: invoice.items, totalPrice: invoice.totalPrice}, user );
        returnedInvoice.user = user;
        await this.rInvoiceRepository.save(returnedInvoice);
        returnedInvoice.user = omitObjectKeys(user, ['accountType', 'hashPassword', 'salt', 'createdAt']) as UserEntity ;
        this.logger.log(`The ${user.accountType} '${user.username}' Create New Returned Invoice With ID '${returnedInvoice.id}'.`);
        return returnedInvoice ;
    }

    /**
     * This function use to get the report for the retruned invoice.
     * @param {UserEntity} user The user who call this function.
     * @returns {InvoiceReportInterface} The invoice report.
     */
    async getReturnedInvoiceReport( user: UserEntity ): Promise<InvoiceReportInterface> {
        const sql: string = readFileSync( './sql/retruned-invoices-report.sql', 'utf-8' );
        const report: DataInvoiceReportInterface[] = ( await this.rInvoiceRepository.query( sql ) ) as DataInvoiceReportInterface[] ;
        this.logger.log(`The ${user.accountType} '${user.username}' Create Returned Invoices Report.`);
        return {
            report: report[0],
            user: omitObjectKeys( user, ['hashPassword','salt', 'createdAt'] ) as UserEntity,
            createAt: new Date()
        } as InvoiceReportInterface;
    }
}
