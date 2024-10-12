import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ItemModule } from 'src/item/item.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ReturnedInvoiceModule } from 'src/returned-invoice/returned-invoice.module';

/**
 * This module use for the reports.
 */
@Module({
  imports: [ ItemModule, InvoiceModule, ReturnedInvoiceModule],
  controllers: [ReportController],
})
export class ReportModule {}
