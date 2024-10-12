import { 
    HttpException, HttpStatus, 
    Injectable, InternalServerErrorException, 
    Logger, 
    NotFoundException, 
    OnModuleInit
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreataUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt' ;
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as config from 'config';
import { accountType } from './enums/account-type.enum';
import { omitObjectKeys } from 'src/utils/omit.util';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor( 
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        ) {}

    private readonly logger: Logger = new Logger('AuthService') ;
    private readonly saltData = config.get('salt');

    /**
     * called when the program is run for checking the admin account.
     */
    async onModuleInit() {
        this.createDevAccount();
    }

    /**
     * This founction use to create a new account in the system.
     * @param {CreataUserDto} createUserDto The information about the user.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<UserEntity>} User information after the creation.
     * ### Exceptions:
     * - HttpException - User is already registered.
     * - InternalServerErrorException
     */
    async createUser( createUserDto: CreataUserDto, user: UserEntity ): Promise<UserEntity> {
        const { username, displayName, password, accountType } = createUserDto ;
        const newUser = new UserEntity() ;
        newUser.username = username.toLowerCase() ;
        newUser.displayName = displayName;
        newUser.salt = await bcrypt.genSalt( Number(this.saltData.range) || 12 ) ;
        newUser.hashPassword = await bcrypt.hash( password, newUser.salt );
        newUser.accountType = accountType ;

        try {
            await newUser.save() ;
            this.logger.log( `The ${user.accountType} '${user.username}' Create ${accountType} '${username}'.` ) ;
            delete newUser.hashPassword;
            delete newUser.salt ;
            return newUser;
        } catch( error ) {
            if (error.code == '23505' ) throw new HttpException(`The user '${createUserDto.username}' is already registered!`, HttpStatus.BAD_REQUEST) ;
            throw new InternalServerErrorException( error ) ;
        }
    }

    /**
     * This function use to login and getting the access token for the user.
     * @param {LoginDto} loginDto Login information.
     * @returns {Promise<{accessToken: string}>} access token.
     * ### Exceptions:
     * - NotFoundException - if the user is not found.
     * - HttpException - The password is not correct.
     */
    async login( loginDto: LoginDto ): Promise<{accessToken: string}> {
        const { username, password } = loginDto ;
        const user = await this.userRepository.findOne({where: {username: username.toLowerCase()} });
        if (!user) throw new NotFoundException();
        const passwordHash = await bcrypt.hash( password, user.salt );
        if (passwordHash !== user.hashPassword ) throw new HttpException('Password is incorrect!', HttpStatus.BAD_REQUEST);
        this.logger.log(`Create Access Token For ${user.accountType} '${user.username}'.`);
        return { accessToken: this.jwtService.sign( {username: user.username, accountType: user.accountType} ) } ;
    }

    /**
     * This function use to udate user information.\
     * The Valid data to update are `username`, `displayName`, `password`, `accountType`.
     * @param {string} _username The user.
     * @param {UpdateUserDto} updateUserDto The update information.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<UserEntity>} The new user with the new information.
     * ### Exceptions:
     * - HttpException - Invalid username
     * - NotFoundException - There is no user.
     * - HttpException - There is invalid update fields in the updateUserDto.
     */
    async updateUser( _username: string, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserEntity> {
        _username = _username.toLowerCase() ;
        if (!_username) throw new HttpException('username query is requier!', HttpStatus.BAD_REQUEST) ;
        const userData = await this.userRepository.findOne( {where: { username: _username } } );
        if (!userData) throw new NotFoundException();

        const updateUserDtoKeys: string[] = [
            'username',
            'displayName',
            'password',
            'accountType'
        ];
        const isValidUpdateDto: boolean = Object.keys(updateUserDto).every( (key) =>  updateUserDtoKeys.includes(key) );
        if (!isValidUpdateDto) throw new HttpException( 'Invalid update fields in the body!', HttpStatus.BAD_REQUEST);
        if (updateUserDto.password) {
            userData.hashPassword = await bcrypt.hash(updateUserDto.password, userData.salt) ;
            delete updateUserDto.password;
        }
        Object.assign(userData, updateUserDto) ;
        await this.userRepository.save(userData) ;

        this.logger.log(`The ${user.accountType} '${user.username}' Update Information for User '${_username}'.`);
        return omitObjectKeys( userData, ['salt', 'hashPassword'] ) as UserEntity;
    }

    /**
     * This function use to delete user.
     * @param {string} username The user.
     * @param {UserEntity} user The user who call this function.
     * @returns {Promise<{message: string}>} Message with the username.
     * ### Exceptions:
     * - HttpException - Invalid username.
     * - NotFoundException - The user not found.
     */
    async deleteUser( username: string, user: UserEntity ): Promise<{message: string}> {
        username = username.toLowerCase();
        if(!username) throw new HttpException(`Username is require!`, HttpStatus.BAD_REQUEST) ;
        const { affected } = await this.userRepository.delete({ username }) ;
        if ( affected > 0 ) {
            this.logger.log(`The ${user.accountType} '${user.username}' Deleted The User '${username}'.`);
            return { message: `User '${username}' has been deleted.` };
        }
        throw new NotFoundException(`User '${username}' not found!`);
    }

    /**
     * This function use to check the developer account if is work,\
     * Or creating the developer account if not.
     * @returns {Promise<boolean>} The status of the developer account.
     */
    private async createDevAccount(): Promise<boolean> {
        const adminData = config.get('admin');
        let user: UserEntity = await this.userRepository.findOne( {where: { username: adminData.username || 'mohaned' }} );
        if ( user ) {
            this.logger.log(`The Admin Account '${user.username}' is Runnig..`);
        } else {
            user = new UserEntity();
            user.accountType = accountType.ADMIN;
            user.username = String(adminData.username).toLowerCase() || 'mohaned' ;
            user.displayName = adminData.name || 'Mohaned Sherhan (Mr.x)';
            user.salt = await bcrypt.genSalt( Number(this.saltData.range) || 12 );
            user.hashPassword = await bcrypt.hash( adminData.password || 'mohaned123', user.salt );
            user.createdAt = new Date() ;
            await this.userRepository.save( user ) ;
            this.logger.log(`The Admin Account With Username '${user.username}' Has Been Created..`);
        }
        return true;
    }
}