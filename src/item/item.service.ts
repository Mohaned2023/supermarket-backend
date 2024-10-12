import { 
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { Repository } from 'typeorm';
import { UpdateItemDto } from './dtos/update-item.dto';
import { readFileSync } from 'fs';
import { DateItemReportInterface, ItemReportInterface } from 'src/interfaces/interfaces';
import { omitObjectKeys } from 'src/utils/omit.util';

@Injectable()
export class ItemService {
    private readonly logger = new Logger('ItmeService');

    constructor( @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity> ) {}

    /**
     * This function use to create an Item in the database.
     * @param {CreateItemDto} createItemDto The Item information.
     * @param {UserEntity} user The user how call this function.
     * @returns {Promise<ItemEntity>} The Item after the creation.
     * ### Exceptions:
     * - HttpException - Item is already exists in the database.
     */
    async createItem( createItemDto: CreateItemDto, user:UserEntity ): Promise<ItemEntity> {
        const item = this.itemRepository.create({
                    ...createItemDto,
                    sellAllItemsPrice: createItemDto.numberOfItems * createItemDto.sellPillPrice,
                    buyAllItemsPrice: createItemDto.numberOfItems * createItemDto.buyPillPrice,
                    user
                });
        try {
            await item.save();
            this.logger.log(`The ${user.accountType} '${user.username}' Created the item '${item.name}'.`);
            delete item.user;
            return item;
        } catch (error) {
            if (error.code === '23505') throw new HttpException(`The item with the id ${createItemDto.itemId} already exists.`, HttpStatus.BAD_REQUEST);
            throw new InternalServerErrorException();
        }
    }

    /**
     * This function use to delete the item from the database.
     * @param {number} itemId The ID of the item. 
     * @param {UserEntity} user The user how call this function.
     * @returns {Promise<{message: string}>} The ok message.
     * ### Exceptions:
     * - NotFoundException - The item is not in the database.
     */
    async deleteItem( itemId: number, user: UserEntity ): Promise<{message: string}> {
        const result = await this.itemRepository.delete({ itemId })
        if (result.affected > 0 ) {
            this.logger.log(`The ${user.accountType} '${user.username}' deleted the item with id '${itemId}'.`);
            return { message: `The item with id '${itemId}' has been deleted.` }
        }
        throw new NotFoundException(`The itme with the id '${itemId}' not found!` );
    }

    /**
     * This function use to update item information. \
     * Update fields are: `itemId`, `name`, `sellPillPrice`, `buyPillPrice`, \
     * `numberOfItems`, `companyName`, `productionDate`, `expiryDate`
     * @param {number} itemId The item ID.
     * @param {UpdateItemDto} updateItemDto The update fields.
     * @param {UserEntity} user The user how call this function.
     * @returns {Promise<ItemEntity>} The Item after the update. 
     * ### Exceptions:
     * - NotFoundException - The Item is not in the database.
     * - HttpException - Invalid update fields in the updateItemDto
     */
    async updateItem( itemId: number, updateItemDto: UpdateItemDto, user: UserEntity ): Promise<ItemEntity> {
        const item = await this.itemRepository.findOne( { where: {itemId} } );
        if (!item) throw new NotFoundException(`Item with id '${itemId}' not found!`);
        const updateItmeDtoKeys: string[] = [
            'itemId',
            'name',
            'sellPillPrice',
            'buyPillPrice',
            'numberOfItems',
            'companyName',
            'productionDate',
            'expiryDate'
        ];
        const isValidUpdateDto: boolean = Object.keys(updateItemDto).every( (key) => updateItmeDtoKeys.includes(key) );
        if (!isValidUpdateDto) throw new HttpException( 'Invalid update fields in the body!', HttpStatus.BAD_REQUEST);

        const numberOfItems: number = updateItemDto.numberOfItems || item.numberOfItems ;
        const buyPillPrice: number = updateItemDto.buyPillPrice || item.buyPillPrice; 
        const sellPillPrice: number = updateItemDto.sellPillPrice || item.sellPillPrice; 
        item.buyAllItemsPrice = buyPillPrice * numberOfItems ;
        item.sellAllItemsPrice = sellPillPrice * numberOfItems ;

        Object.assign(item, updateItemDto) ;
        await this.itemRepository.save(item);
        this.logger.log(`The ${user.accountType} '${user.username}' update the item with id '${itemId}'.`);
        delete item.user ;
        return item;
    }

    /**
     * This function use to update the number of items in the database\
     * when they sell or buy new items.
     * @param {number} itemId The item ID.
     * @param {number} numberOfItems The number of items.
     * @param {boolean} sub If it is sell or buy.
     * @param {UserEntity} user The user how call this function.
     * @returns {Promise<{message: string}>} The ok message.
     * ### Exceptions:
     * - NotFoundException - The Item is not in the database.
     */
    async updateNumberOfItems ( itemId: number, numberOfItems: number, sub: boolean, user: UserEntity ): Promise<{message: string}> {
        const item = await this.itemRepository.findOne( {where: { itemId  } } );
        if (!item) throw new NotFoundException(`The item with the id '${itemId}' Not Found!`);

        if ( sub ) item.numberOfItems -= numberOfItems;
        else item.numberOfItems += numberOfItems;

        if ( sub && item.numberOfItems < 1 ) return await this.deleteItem(item.id, user);

        item.buyAllItemsPrice = item.buyPillPrice * numberOfItems ;
        item.sellAllItemsPrice = item.sellPillPrice * numberOfItems ;
        await this.itemRepository.save(item) ;
        this.logger.log(`The ${user.accountType} '${user.username}' Update The Number of Items for item '${itemId}'.`); 
        return { message: 'The Item Updated.' } ;
    }

    /**
     * This function is use to generate the items report\
     * by using SQL commands.
     * @param {UserEntity} user The user how call this function.
     * @returns {Promise<ItemReportInterface>} The report.
     */
    async getItemsReport( user: UserEntity ): Promise<ItemReportInterface> {
        const sql: string = readFileSync( './src/items-report.sql', 'utf-8' );
        const report: DateItemReportInterface[] = (await this.itemRepository.query(sql)) as DateItemReportInterface[] ;
        this.logger.log(`The ${user.accountType} '${user.username}' Create Item Report.`);
        return {
            report: report[0],
            user: omitObjectKeys( user, ['hashPassword','salt', 'createdAt'] ) as UserEntity,
            createAt: new Date()
        } as ItemReportInterface;
    }
}