import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    UseGuards
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { GetUser } from 'src/auth/decorators/jwt.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auht.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { accountType } from 'src/auth/enums/account-type.enum';
import { InvoiceEntity } from './entities/invoice.entity';
import { 
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { createDoc, deleteDoc, findDoc } from './swagger/controller.swagger';

@ApiTags('Invoice')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
    constructor( private readonly invoiceService: InvoiceService ) {}

    @ApiOperation(createDoc.operation)
    @ApiOkResponse(createDoc.responses.success)
    @ApiNotFoundResponse(createDoc.responses.notFound)
    @ApiBadRequestResponse(createDoc.responses.badRequest)
    @ApiForbiddenResponse(createDoc.responses.forbidden)
    @ApiUnauthorizedResponse(createDoc.responses.unauthorized)
    @ApiBody({
        type: [CreateInvoiceDto],
        description: 'Array of Items to be created.'
    })
    @UseGuards( RolesGuard )
    @Roles(accountType.ACCOUNTANT)
    @Post('create')
    createInvoice(
        @Body(new ParseArrayPipe({items: CreateInvoiceDto})) createInvoiceDtos: CreateInvoiceDto[],
        @GetUser() user: UserEntity
    ): Promise<InvoiceEntity> {
        return this.invoiceService.createInvoice( createInvoiceDtos, user );
    }

    @ApiOperation(findDoc.operation)
    @ApiOkResponse(findDoc.responses.success)
    @ApiNotFoundResponse(findDoc.responses.notFound)
    @ApiUnauthorizedResponse(findDoc.responses.unauthorized)
    @Get('find/:id')
    findInvoice( @Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<InvoiceEntity> {
        return this.invoiceService.findInvoice( id, user );
    }

    @ApiOperation(deleteDoc.operation)
    @ApiOkResponse(deleteDoc.responses.success)
    @ApiNotFoundResponse(deleteDoc.responses.notFound)
    @ApiForbiddenResponse(deleteDoc.responses.forbidden)
    @ApiUnauthorizedResponse(deleteDoc.responses.unauthorized)
    @UseGuards( RolesGuard )
    @Roles(accountType.ACCOUNTANT)
    @Delete('delete/:id')
    deleteInvoice( @Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity ): Promise<{message: string}> {
        return this.invoiceService.deleteInvoice( id, user ) ;
    }
}
