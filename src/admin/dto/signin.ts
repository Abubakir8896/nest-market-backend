import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDto {
    @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Admin email'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'Qwerty!2345', description: 'Admin password'})
    @IsNotEmpty()
    password: string;
}