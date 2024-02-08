import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DiscountProduct } from './entities';
import { CreateDiscountProductDto, UpdateDiscountProductDto } from './dto';
import { Discount } from '../discount/entities';
import { Product } from '../product/entities';

@Injectable()
export class DiscountProductService {
  constructor(
    @InjectRepository(DiscountProduct)private discountProductRepository: Repository<DiscountProduct>,
    @InjectRepository(Discount)private discountRepository: Repository<Discount>,
    @InjectRepository(Product)private productRepository: Repository<Product>,
  ){}

  async createDiscount(createDiscountProductDto: CreateDiscountProductDto): Promise<Object> {
    const [discount] = await this.discountRepository.find({ where: { discount_id: Number(createDiscountProductDto.discount) } });
    const [product] = await this.productRepository.find({ where: { product_id: Number(createDiscountProductDto.product) } });

    if (!discount) {
      return {
        message: "Discount Is Not Found",
        status: HttpStatus.NOT_FOUND,
      };
    }
    if (!product) {
      return {
        message: "Product Is Not Found",
        status: HttpStatus.NOT_FOUND,
      };
    }

    const newProductDiscount = await this.discountProductRepository.save({
      ...createDiscountProductDto,
      product_id: Number(createDiscountProductDto.product),
      discount_id: Number(createDiscountProductDto.discount),
    });

    return {
      message: "Successfully Created",
      product_discount: newProductDiscount,
      status: HttpStatus.OK,
    };
  }

  
  async findAllDiscountProducts():Promise<Object> {
    const discountProducts = await this.discountProductRepository.find()

    if(!discountProducts) return{
                          message:"DiscountProducts Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            discountProducts,
            status:HttpStatus.OK
    }
  }

  async findOneDiscountProducts(id: number) {
    const discountProduct = await this.discountProductRepository.findBy({discount_id:id})

    if(!discountProduct) return{
                          message:"Discount Product Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            discountProduct,
            status:HttpStatus.OK
    }
  }
}
