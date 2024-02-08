import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class UpdateDiscountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    persentage: string;

    @IsDateString()
    @IsNotEmpty()
    start_date: Date;
  
    @IsDateString()
    @IsNotEmpty()
    end_date: Date;
}
