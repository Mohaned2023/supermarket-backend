import { JwtPayloadInterface } from "src/interfaces/interfaces";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import * as config from 'config';

const jwt = config.get('jwt')

/**
 * This Module use to authenticate the request by the JWT.
 * @extends PassportStrategy As a JWT strategy.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity> ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: jwt.ignoreExpiration,
            secretOrKey: jwt.secretOrKey,
        })
    }

    /**
     * This function use to check if the user is in the database.
     * @param payload The user information after the authenticate.
     * @returns The user entity to by injected in the request body.
     * ### Exceptions: 
     * - UnauthorizedException - If the JWT token invalid.
     */
    async validate( payload: JwtPayloadInterface ): Promise<UserEntity> {
        const {username} = payload ;
        const user = await this.userRepository.findOne( {where: {username} } ) ;
        if (!user) throw new UnauthorizedException() ;
        return user;
    }
}