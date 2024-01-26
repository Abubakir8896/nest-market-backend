import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { FilesModule } from '../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Category
      ]
    ),
    FilesModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}