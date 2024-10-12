import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'This is the username.',
        example: 'mohaned',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({
        description: 'This is the password.',
        example: 'Mohaned2023+',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}