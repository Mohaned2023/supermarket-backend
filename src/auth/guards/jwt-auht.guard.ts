import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * This module use to create a Auth Guard for the JWT.
 * @extends AuthGuard As JWT Guard.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}