import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Object> {
    return this.productService.createProduct(createProductDto);
  }

  @Get('all')
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get('one/:id')
  findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }

  @Put('update/:id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(+id, updateProductDto);
  }

  @Delete('delete/:id')
  removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
