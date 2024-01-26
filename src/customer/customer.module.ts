import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';


@Module({
  imports: [
TypeOrmModule.forFeature(
      [
        Customer
      ]
    ),
    JwtModule.register(
      {}
    )
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}