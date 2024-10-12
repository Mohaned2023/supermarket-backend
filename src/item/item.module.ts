import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { ItemService } from './item.service';

/**
 * This module use to deal with items.
 */
@Module({
  imports: [ TypeOrmModule.forFeature([ItemEntity]) ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService]
})
export class ItemModule {}
