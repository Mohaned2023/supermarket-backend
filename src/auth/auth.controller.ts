import { Body, Controller, Delete, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreataUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auht.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { accountType } from './enums/account-type.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { GetUser } from './decorators/jwt.decorator';
import { 
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { deleteDoc, loginDoc, registerDoc, updateDoc } from './swagger/controller.swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService ) {}

    @ApiOperation(registerDoc.operation)
    @ApiBearerAuth()
    @ApiOkResponse(registerDoc.responses.success)
    @ApiBadRequestResponse(registerDoc.responses.badRequest)
    @ApiUnauthorizedResponse(registerDoc.responses.unauthorized)
    @ApiForbiddenResponse(registerDoc.responses.forbidden)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(accountType.ADMIN)
    @UsePipes(ValidationPipe)
    @Post('register') // api/auth/register
    register(@Body() createUserDto: CreataUserDto, @GetUser() user: UserEntity ): Promise<UserEntity> {
        return this.authService.createUser(createUserDto, user);
    }

    
    @ApiOperation(loginDoc.operation)
    @ApiCreatedResponse(loginDoc.responses.success)
    @ApiNotFoundResponse(loginDoc.responses.notFound)
    @ApiBadRequestResponse(loginDoc.responses.badRequest)
    @Post('login') // api/auth/login
    @UsePipes(ValidationPipe)
    login( @Body() loginDto: LoginDto ): Promise<{accessToken: string}> {
        return this.authService.login(loginDto);
    }


    @ApiOperation(updateDoc.operation)
    @ApiBearerAuth()
    @ApiOkResponse(updateDoc.responses.success)
    @ApiBadRequestResponse(updateDoc.responses.badRequest)
    @ApiNotFoundResponse(updateDoc.responses.notFound)
    @ApiUnauthorizedResponse(updateDoc.responses.unauthorized)
    @ApiForbiddenResponse(updateDoc.responses.forbidden)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(accountType.ADMIN)
    @UsePipes(ValidationPipe)
    @Patch('update/:username') // api/auth/update/:username
    updateUser( @Param('username') username: string, @Body() updateUserDto: UpdateUserDto, @GetUser() user: UserEntity ) {
        return this.authService.updateUser(username, updateUserDto, user) ;
    }

    @ApiOperation(deleteDoc.operation)
    @ApiBearerAuth()
    @ApiOkResponse(deleteDoc.responses.success)
    @ApiBadRequestResponse(deleteDoc.responses.badRequest)
    @ApiNotFoundResponse(deleteDoc.responses.notFound)
    @ApiUnauthorizedResponse(deleteDoc.responses.unauthorized)
    @ApiForbiddenResponse(deleteDoc.responses.forbidden)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(accountType.ADMIN)
    @Delete('delete/:username') // api/auth/delete/:username
    deleteUser( @Param('username') username: string, @GetUser() user: UserEntity ): Promise<{ message: string }> {
        return this.authService.deleteUser(username, user) ;
    }
}
