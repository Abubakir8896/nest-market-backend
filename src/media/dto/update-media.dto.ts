import { IsNotEmpty } from "class-validator";
import { Product } from "../../product/entities";

export class UpdateMediaDto {
    @IsNotEmpty()
    product:Product
}
