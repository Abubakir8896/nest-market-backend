import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateAdminDto {
    @ApiProperty({ example: 'Avalov Xasan', description: 'Admin full name'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Admin email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;
}