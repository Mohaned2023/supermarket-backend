import { createParamDecorator, ExecutionContext} from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";

/**
 * This decorator use to extract the user entity from the request.
 */
export const GetUser = createParamDecorator( ( _ , ctx: ExecutionContext ): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user ;
})
