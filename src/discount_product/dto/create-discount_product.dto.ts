import { IsNotEmpty } from "class-validator";
import { Discount } from "../../discount/entities";
import { Product } from "../../product/entities";

export class CreateDiscountProductDto {
    @IsNotEmpty()
    product:Product

    @IsNotEmpty()
    discount:Discount
}
