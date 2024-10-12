import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";



export class CreateItemDto {
    @ApiProperty({
        description: 'Itme ID',
        example: 1,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    itemId: number;

    @ApiProperty({
        description: 'Itme name',
        maximum: 50,
        example: 'X Chocolate',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @ApiProperty({
        description: 'Selling price of one piece.',
        example: 4.6,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    sellPillPrice: number;

    @ApiProperty({
        description: 'Purchase price of one piece.',
        example: 3.6,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    buyPillPrice: number;

    @ApiProperty({
        description: 'The Number of all pieces.',
        example: 45,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    numberOfItems: number;

    @ApiProperty({
        description: 'The Company name.',
        maximum: 50,
        example: 'X Company',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    companyName: string;

    @ApiProperty({
        description: 'Production Date.',
        example: new Date(),
        required: true
    })
    @IsDate()
    @IsNotEmpty()
    @Type( () => Date )
    productionDate: Date;

    @ApiProperty({
        description: 'Expiry Date.',
        example: new Date(),
        required: true
    })
    @IsDate()
    @IsNotEmpty()
    @Type( () => Date )
    expiryDate: Date;
}
