import { CreataUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/swagger";

/**
 * This DTO use for update user information.
 * @extends PartialType From Swagger to make all CreateUserDto fields optionals and to update the Swagger Doc.  
 */
export class UpdateUserDto extends PartialType(CreataUserDto) {}