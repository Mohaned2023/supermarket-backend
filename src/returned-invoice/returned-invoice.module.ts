import { Module } from '@nestjs/common';
import { RetrunedInvoiceController } from './returned-invoice.controller';
import { ReturnedInvoiceService } from './returned-invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnedInvoiceEntity } from './entities/returned-invoice.entity';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ItemModule } from 'src/item/item.module';

/**
 * This Module use for returned invoices.
 */
@Module({
  imports: [ 
    TypeOrmModule.forFeature([ReturnedInvoiceEntity]),
    InvoiceModule,
    ItemModule
  ],
  controllers: [RetrunedInvoiceController],
  providers: [ ReturnedInvoiceService ],
  exports: [ ReturnedInvoiceService ]
})
export class ReturnedInvoiceModule {}
