import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Category } from './../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)private productRepository: Repository<Product>,
    @InjectRepository(Category)private categoryRepository: Repository<Category>,
  ){}

  async createProduct(createProductDto: CreateProductDto):Promise<Object> {
    const [product] = await this.productRepository.find({where:{name:createProductDto.name}})
    const [ category ] = await this.categoryRepository.find({where:{category_id:Number(createProductDto.category)}})

    if(!category) return{
                          message:"Category Not Found",
                          status:HttpStatus.NOT_FOUND
    }

    if(product) return{
                          message:"Product already exist",
                          status:HttpStatus.CONFLICT
    }

    const new_product = await this.productRepository.save({...createProductDto, category_id:Number(createProductDto.category),  created_at:new Date(), updated_at:new Date()})

    return {
            message:"Succesfully Created",
            product: new_product,
            status:HttpStatus.OK,
    }
  }

  async findAllProduct():Promise<Object> {
    const products = await this.productRepository.find()

    if(!products) return{
                          message:"Products Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            products,
            status:HttpStatus.OK
    }
  }

  async findOneProduct(id: number) {
    const product = await this.productRepository.find({where:{product_id:id}, relations:["category", "photos"]})

    if(!product) return{
                          message:"Product Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            product,
            status:HttpStatus.OK
    }
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
     const [product] = await this.productRepository.find({where:{name:updateProductDto.name}})

     const [ category ] = await this.productRepository.find({where:{category_id:Number(updateProductDto.category)}})

     if(!category) return{
                           message:"Category Not Found",
                           status:HttpStatus.NOT_FOUND
     }

     if(product) return{
                          message:"Product already exist",
                          status:HttpStatus.CONFLICT,
     }

     const updated_product = await this.productRepository.update(
      {
        product_id:id
      },
      {
        ...updateProductDto,
        category_id:Number(updateProductDto.category),
        updated_at:new Date()
      }
     )

     return {
              message:"Succesfully Updated",
              status:HttpStatus.OK,
              updated_product
     }
  }

  async removeProduct(id: number):Promise<Object> {
      const [product] = await this.productRepository.findBy({product_id:id})
      if(!product) return {
                            message:"Product Not Found",
                            status:HttpStatus.CONFLICT
      }

      await this.productRepository.delete({product_id:id})

      return {
              message:"Succesfully Deleted",
              status:HttpStatus.OK
      }
  }
}
