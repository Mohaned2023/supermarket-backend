import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorEntitiy } from './entities/error.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class ErrorService {
    constructor( 
        @InjectRepository(ErrorEntitiy) private readonly errorRepository: Repository<ErrorEntitiy>
    ) {}

    private readonly logger = new Logger('ErrorService');


    /**
     * This function use to log the error of items to the database.
     * @param {string} message  
     * @param {UserEntity} user 
     * @returns {Promise<{message: string}>}
     */
    async create( message: string, user: UserEntity ): Promise<{message: string}> {
        const error = this.errorRepository.create( {message, user} as ErrorEntitiy );
        await this.errorRepository.save(error);
        this.logger.log(`The ${user.accountType} '${user.username}' Create New ErrorEntity With ID '${error.id}'.`);
        return { message: 'Error Created.' };
    }
}
