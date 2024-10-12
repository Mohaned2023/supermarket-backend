import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auht.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { accountType } from 'src/auth/enums/account-type.enum';
import { GetUser } from 'src/auth/decorators/jwt.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ItemService } from 'src/item/item.service';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ReturnedInvoiceService } from 'src/returned-invoice/returned-invoice.service';
import { 
    ApiBearerAuth,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { invoiceDoc, itemDoc, returnedInvoiceDoc } from './swagger/controller.swagger';

@ApiTags('Report')
@ApiBearerAuth()
@UseGuards( JwtAuthGuard, RolesGuard )
@Roles(accountType.ADMIN)
@Controller('report')
export class ReportController {
    constructor( 
        private readonly itemService: ItemService,
        private readonly invoiceService: InvoiceService,
        private readonly returnedInvoiceService: ReturnedInvoiceService
    ) {}

    @ApiOperation(itemDoc.operation)
    @ApiOkResponse(itemDoc.responses.success)
    @ApiForbiddenResponse(itemDoc.responses.forbidden)
    @ApiUnauthorizedResponse(itemDoc.responses.unauthorized)
    @Get('items')
    getItemsReport( @GetUser() user: UserEntity ) {
        return this.itemService.getItemsReport( user ) ;
    }

    @ApiOperation(invoiceDoc.operation)
    @ApiOkResponse(invoiceDoc.responses.success)
    @ApiForbiddenResponse(invoiceDoc.responses.forbidden)
    @ApiUnauthorizedResponse(invoiceDoc.responses.unauthorized)
    @Get('invoices')
    getInvoicesReport( @GetUser() user: UserEntity ) {
        return this.invoiceService.getInvoiceReport( user ) ;
    }

    @ApiOperation(returnedInvoiceDoc.operation)
    @ApiOkResponse(returnedInvoiceDoc.responses.success)
    @ApiForbiddenResponse(returnedInvoiceDoc.responses.forbidden)
    @ApiUnauthorizedResponse(returnedInvoiceDoc.responses.unauthorized)
    @Get('retruned-invoices')
    getReturnedInvoicesReport( @GetUser() user: UserEntity ) {
        return this.returnedInvoiceService.getReturnedInvoiceReport( user );
    }
}
