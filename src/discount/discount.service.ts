import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Discount } from './entities';
import { CreateDiscountDto, UpdateDiscountDto } from './dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)private disocuntRepository: Repository<Discount>,
  ){}

  async createDiscount(createDiscountDto: CreateDiscountDto):Promise<Object> {
    const [discount] = await this.disocuntRepository.find({where:{name:createDiscountDto.name}})

    if(discount)return{
                        message:"There is such a discount",
                        status:HttpStatus.CONFLICT
    }

    const new_discount = await this.disocuntRepository.save(createDiscountDto)

    return {
            message:"Succesfully Created",
            discount: new_discount,
            status:HttpStatus.OK,
    }
  }

  async findAllDiscounts():Promise<Object> {
    const discounts = await this.disocuntRepository.find()

    if(!discounts) return{
                          message:"Discounts Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            discounts,
            status:HttpStatus.OK
    }
  }

  async findOneDiscounts(id: number) {
    const discount = await this.disocuntRepository.findBy({discount_id:id})

    if(!discount) return{
                          message:"Discount Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            discount,
            status:HttpStatus.OK
    }
  }

  async updateDiscount(id: number, updateDiscountDto: UpdateDiscountDto) {

    const [discount] = await this.disocuntRepository.find({where:{name:updateDiscountDto.name}})
    if(discount)return{
                        message:"Discounts Not Found",
                        status: HttpStatus.NOT_FOUND                  
    }

     const updated_discount = await this.disocuntRepository.update(
      {
        discount_id:id
      },
      updateDiscountDto
     )

     return {
              message:"Succesfully Updated",
              status:HttpStatus.OK,
              updated_discount
     }
  }

  async removeDiscount(id: number):Promise<Object> {
      const [discount] = await this.disocuntRepository.findBy({discount_id:id})
      if(!discount) return {
                            message:"Discount Not Found",
                            status:HttpStatus.CONFLICT
      }

      await this.disocuntRepository.delete({discount_id:id})

      return {
              message:"Succesfully Deleted",
              status:HttpStatus.OK
      }
  }
}
