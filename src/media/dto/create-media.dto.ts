import { IsNotEmpty } from "class-validator";
import { Product } from "../../product/entities";

export class CreateMediaDto {
    @IsNotEmpty()
    product:Product
}
