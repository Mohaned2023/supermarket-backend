import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInvoiceDto {
    @ApiProperty({
        description: 'The item ID',
        example: 1,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    itemId: number;

    @ApiProperty({
        description: 'The number of items.',
        example: 2,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    numberOfItems: number;
}
