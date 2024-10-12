import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorators/roles.decorator";

/**
 * This module use to authoriz the user role.
 * @extends CanActivate
 */
export class RolesGuard implements CanActivate {
    constructor(  private reflector: Reflector = new Reflector() ) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return roles.includes(user.accountType) ;
    }
}