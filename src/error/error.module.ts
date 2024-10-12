import { Module } from '@nestjs/common';
import { ErrorService } from './error.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorEntitiy } from './entities/error.entity';

/**
 * This module use for errors.
 */
@Module({
  imports: [ TypeOrmModule.forFeature([ErrorEntitiy]) ],
  providers: [ErrorService],
  exports: [ ErrorService ]
})
export class ErrorModule {}
