import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CustomerSignInDto {
    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Customer email'})
    @IsEmail()
    @IsNotEmpty()
    phone: string;
}