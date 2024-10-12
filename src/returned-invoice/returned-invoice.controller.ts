import { 
    Body, 
    Controller, 
    ParseArrayPipe,
    ParseIntPipe,
    Post,
    Query,
    UseGuards 
} from '@nestjs/common';
import { ReturnedInvoiceService } from './returned-invoice.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auht.guard';
import { CreateReturnedInvoiceDto } from './dtos/create-returned-invoice.dto';
import { GetUser } from 'src/auth/decorators/jwt.decorator';
import { UserEntity } from 'src/auth/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { accountType } from 'src/auth/enums/account-type.enum';
import { ReturnedInvoiceEntity } from './entities/returned-invoice.entity';
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
import { createDoc } from './swagger/controller.swagger';

@ApiTags('Returned Invoice')
@ApiBearerAuth()
@UseGuards( JwtAuthGuard )
@Controller('returned-invoice')
export class RetrunedInvoiceController {
    
    constructor( private readonly returnedInvoiceService: ReturnedInvoiceService ) {}
    
    @ApiOperation(createDoc.operation)
    @ApiOkResponse(createDoc.responses.success)
    @ApiBadRequestResponse(createDoc.responses.badRequest)
    @ApiNotFoundResponse(createDoc.responses.notFound)
    @ApiForbiddenResponse(createDoc.responses.forbidden)
    @ApiUnauthorizedResponse(createDoc.responses.unauthorized)
    @ApiBody({
        type: [CreateReturnedInvoiceDto],
        description: 'Array of Items to be retruned.'
    })
    @UseGuards( RolesGuard )
    @Roles( accountType.ACCOUNTANT )
    @Post('create')
    createRInvoice( 
        @Body(new ParseArrayPipe({items: CreateReturnedInvoiceDto}) ) crid: CreateReturnedInvoiceDto[],
        @Query('invoiceId', ParseIntPipe) invoiceId: number,
        @GetUser() user: UserEntity
    ): Promise <ReturnedInvoiceEntity> {
        return this.returnedInvoiceService.create( invoiceId, crid, user );
    }
}
