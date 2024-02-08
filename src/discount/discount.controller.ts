import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DiscountService } from './discount.service';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post('create')
  createDiscount(
    @Body() createDiscountDto: CreateDiscountDto,
  ): Promise<Object> {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Get('all')
  findAllDiscounts() {
    return this.discountService.findAllDiscounts();
  }

  @Get('one/:id')
  findOneDiscounts(@Param('id') id: string) {
    return this.discountService.findOneDiscounts(+id);
  }

  @Put('update/:id')
  updateDiscount(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.updateDiscount(+id, updateDiscountDto);
  }

  @Delete('delete/:id')
  removeDiscount(@Param('id') id: string) {
    return this.discountService.removeDiscount(+id);
  }
}
