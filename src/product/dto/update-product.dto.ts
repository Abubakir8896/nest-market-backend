import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Category } from "../../category/entities";

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    price: string;

    @IsNotEmpty()
    total_count: number;

    @IsDateString()
    @IsNotEmpty()
    mfg: Date;

    @IsString()
    @IsNotEmpty()
    life: string;

    @IsString()
    @IsNotEmpty()
    value: string;

    @IsString()
    @IsNotEmpty()
    brand: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    category: Category;
}
