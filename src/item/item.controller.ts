import { 
    Body,
    Controller,
    Delete,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemService } from './item.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auht.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { accountType } from 'src/auth/enums/account-type.enum';
import { GetUser } from 'src/auth/decorators/jwt.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ItemEntity } from './entities/item.entity';
import { UpdateItemDto } from './dtos/update-item.dto';
import { 
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { createDoc, deleteDoc, updateDoc } from './swagger/controller.swagger';

@ApiTags('Item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(accountType.ADMIN)
@Controller('item')
export class ItemController {

    constructor( private readonly itemService: ItemService ) {}

    @ApiOperation(createDoc.operation)
    @ApiOkResponse(createDoc.responses.success)
    @ApiBadRequestResponse(createDoc.responses.badRequest)
    @ApiUnauthorizedResponse(createDoc.responses.unauthorized)
    @ApiForbiddenResponse(createDoc.responses.forbidden)
    @UsePipes(ValidationPipe)
    @Post('add')
    createItem( @Body() createItemDto: CreateItemDto, @GetUser() user: UserEntity ): Promise<ItemEntity> {
        return this.itemService.createItem(createItemDto, user);
    }

    @ApiOperation(deleteDoc.operation)
    @ApiOkResponse(deleteDoc.responses.success)
    @ApiNotFoundResponse(deleteDoc.responses.notFound)
    @ApiUnauthorizedResponse(deleteDoc.responses.unauthorized)
    @ApiForbiddenResponse(deleteDoc.responses.forbidden)
    @Delete('delete/:id')
    deleteItem( @Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity ): Promise<{message: string}> {
        return this.itemService.deleteItem(id, user) ;
    }

    @ApiOperation(updateDoc.operation)
    @ApiOkResponse(updateDoc.responses.success)
    @ApiNotFoundResponse(updateDoc.responses.notFound)
    @ApiBadRequestResponse(updateDoc.responses.badRequest)
    @ApiUnauthorizedResponse(updateDoc.responses.unauthorized)
    @ApiForbiddenResponse(updateDoc.responses.forbidden)
    @UsePipes(ValidationPipe)
    @Patch('update/:id')
    updateItem( @Param('id', ParseIntPipe) itmeId: number, @Body() updateItemDto: UpdateItemDto, @GetUser() user: UserEntity ) {
        return this.itemService.updateItem(itmeId, updateItemDto, user);
    }
}