import { IsNotEmpty, IsNumber } from "class-validator";


export class UpdateNumberOfItems {
    @IsNumber()
    @IsNotEmpty()
    numberOfItems: number;
}
