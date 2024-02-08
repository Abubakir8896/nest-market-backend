import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Discount } from './entities';
import { FilesModule } from '../file/file.module';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Discount
      ]
    ),
    FilesModule
  ],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}