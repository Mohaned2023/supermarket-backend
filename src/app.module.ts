import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ItemModule } from './item/item.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ReturnedInvoiceModule } from './returned-invoice/returned-invoice.module';
import { ErrorModule } from './error/error.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    ItemModule,
    InvoiceModule,
    ReturnedInvoiceModule,
    ErrorModule,
    ReportModule,
  ]
})
export class AppModule {}
