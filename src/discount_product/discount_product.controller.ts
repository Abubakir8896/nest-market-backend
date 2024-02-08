import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiscountProductService } from './discount_product.service';
import { CreateDiscountProductDto } from './dto/create-discount_product.dto';
import { UpdateDiscountProductDto } from './dto/update-discount_product.dto';

@Controller('discount-product')
export class DiscountProductController {
  constructor(private readonly discountProductService: DiscountProductService) {}

  @Post("create")
  createDiscount(@Body() createDiscountProductDto: CreateDiscountProductDto) {
    return this.discountProductService.createDiscount(createDiscountProductDto);
  }

  @Get("find")
  findAllDiscountProducts() {
    return this.discountProductService.findAllDiscountProducts();
  }

  @Get('find/:id')
  findOneDiscountProducts(@Param('id') id: string) {
    return this.discountProductService.findOneDiscountProducts(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDiscountProductDto: UpdateDiscountProductDto) {
  //   return this.discountProductService.update(+id, updateDiscountProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.discountProductService.remove(+id);
  // }
}
