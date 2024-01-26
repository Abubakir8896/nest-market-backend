import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class Registration {
    @ApiProperty({ example: 'Avalov Xasan', description: 'Admin full name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Admin email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}