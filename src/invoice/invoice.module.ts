import { Module } from '@nestjs/common';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { ItemEntity } from 'src/item/entities/item.entity';
import { ItemModule } from 'src/item/item.module';
import { ErrorModule } from 'src/error/error.module';

/**
 * This module use to generate invoice.
 */
@Module({
  imports: [ 
    TypeOrmModule.forFeature([InvoiceEntity, ItemEntity]),
    ItemModule,
    ErrorModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [ InvoiceService ]
})
export class InvoiceModule {}
