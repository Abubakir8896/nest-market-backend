import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './entities';
import { AdminService } from './admin.service';
import { AdminsController } from './admin.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Admin
      ]
    ),
    JwtModule.register(
      {}
    )
  ],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminModule {}