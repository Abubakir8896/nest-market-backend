import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Admin } from './admin/entities';
import { Customer } from './customer/entities';

import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities';
import { MediaModule } from './media/media.module';
import { Media } from './media/entities';


@Module({
  imports: [
  ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    
    ServeStaticModule.forRoot(
      {
        rootPath: resolve(__dirname, 'static')
      }
    ),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Admin, Customer, Category, Product, Media],
      synchronize: true,
    }),
    AdminModule,
    CustomerModule,
    CategoryModule,
    ProductModule,
    MediaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}