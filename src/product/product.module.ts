import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities';
import { Category } from './../category/entities/category.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';
import { CategoryService } from '../category/category.service';
import { FilesModule } from '../file/file.module';

@Module({
  imports: [
  TypeOrmModule.forFeature(
      [
        Product,
        Category
      ]
    ),
     CategoryModule,
     FilesModule
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}