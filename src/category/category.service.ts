import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities';
import { FilesService } from '../file/file.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)private categoryRepository: Repository<Category>,
    private fileService: FilesService,
  ){}

  async createCategory(createCategoryDto: CreateCategoryDto, photo:any):Promise<Object> {
    const [category] = await this.categoryRepository.find({where:{name:createCategoryDto.name}})
    const file = await this.fileService.createFile(photo);

    if(category) return{
                          message:"Category already exist",
                          status:HttpStatus.CONFLICT
    }

    const new_category = await this.categoryRepository.save({...createCategoryDto, photo:`http://localhost:4000/api/${file}`})

    return {
            message:"Succesfully Created",
            category: new_category,
            status:HttpStatus.OK,
    }
  }

  async findAllCategory():Promise<Object> {
    const categorys = await this.categoryRepository.find()

    if(!categorys) return{
                          message:"Categorys Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            categorys,
            status:HttpStatus.OK
    }
  }

  async findOneCategory(id: number) {
    const category = await this.categoryRepository.findBy({category_id:id})

    if(!category) return{
                          message:"Category Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            category,
            status:HttpStatus.OK
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
     const [category] = await this.categoryRepository.find({where:{name:updateCategoryDto.name}})

     if(category) return{
                          message:"Category already exist",
                          status:HttpStatus.CONFLICT,
     }

     const updated_category = await this.categoryRepository.update(
      {
        category_id:id
      },
      updateCategoryDto
     )

     return {
              message:"Succesfully Updated",
              status:HttpStatus.OK,
              updated_category
     }
  }

  async removeCategory(id: number):Promise<Object> {
      const [category] = await this.categoryRepository.findBy({category_id:id})
      if(!category) return {
                            message:"Category Not Found",
                            status:HttpStatus.CONFLICT
      }

      await this.categoryRepository.delete({category_id:id})

      return {
              message:"Succesfully Deleted",
              status:HttpStatus.OK
      }
  }
}
