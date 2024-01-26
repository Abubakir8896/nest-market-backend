import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength, IsDateString } from "class-validator";

export class UpdateCustomerDto {
    @ApiProperty({ example: 'Xasan', description: 'Customer full name'})
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Avalov', description: 'Customer full name'})
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Customer email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '2008-12-20', description: 'Customer birth date'})
    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;

    @ApiProperty({ example: '1', description: 'Customer gender'})
    @IsNotEmpty()
    gender: number;

    @ApiProperty({ example: '+998931234567', description: 'Customer phone Number'})
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone: string;
}