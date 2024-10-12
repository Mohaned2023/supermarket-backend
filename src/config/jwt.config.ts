import { JwtModuleOptions } from "@nestjs/jwt";
import * as config from 'config';

const jwt = config.get('jwt');

export const jwtConfig: JwtModuleOptions = {
    secret: jwt.secretOrKey,
    signOptions: {
        expiresIn: jwt.expiresIn
    }
};