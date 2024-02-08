import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscountProduct } from './entities';
import { FilesModule } from '../file/file.module';
import { DiscountProductController } from './discount_product.controller';
import { DiscountProductService } from './discount_product.service';
import { ProductService } from '../product/product.service';
import { DiscountService } from '../discount/discount.service';
import { Product } from '../product/entities';
import { Discount } from '../discount/entities';
import { ProductModule } from '../product/product.module';
import { DiscountModule } from '../discount/discount.module';
import { Category } from '../category/entities';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';

@Module({
  imports: [
  TypeOrmModule.forFeature(
      [
        DiscountProduct,
        Product,
        Discount,
        Category
      ]
    ),
    ProductModule,
    DiscountModule,
    CategoryModule,
    FilesModule
  ],
  controllers: [DiscountProductController],
  providers: [DiscountProductService, ProductService, DiscountService, CategoryService],
})
export class DiscountProductModule {}