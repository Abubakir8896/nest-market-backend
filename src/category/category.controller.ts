import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.categoryService.createCategory(createCategoryDto, image);
  }

  @Get('all')
  findAllCategory() {
    return this.categoryService.findAllCategory();
  }

  @Get('one/:id')
  findOneCategory(@Param('id') id: string) {
    return this.categoryService.findOneCategory(+id);
  }

  @Put('update/:id')
  updateCategory(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(+id);
  }
}
