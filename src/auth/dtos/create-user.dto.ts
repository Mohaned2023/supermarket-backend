import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { accountType } from "../enums/account-type.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreataUserDto {
    @ApiProperty({
        description: 'This is the username.',
        example: 'mohaned',
        maximum: 15,
        minimum: 3,
        required: true
    })
    @MaxLength(15)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'This is the display name.',
        example: 'Mohaned Sherhan (Mr.x)',
        maximum: 50,
        minimum: 3,
        required: true
    })
    @MaxLength(50)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    displayName: string;

    @ApiProperty({
        description: 'This is the password.',
        example: 'Mohaned2023+',
        maximum: 128,
        minimum: 8,
        required: true
    })
    @MaxLength(128)
    @MinLength(8)
    @IsString()
    @IsNotEmpty()
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'password too weak.'}
    )
    password: string;

    @ApiProperty({
        description: 'This is the account Role.',
        example: 'ACCOUNTANT',
        enum: accountType,
        required: true
    })
    @IsNotEmpty()
    accountType: accountType;
}