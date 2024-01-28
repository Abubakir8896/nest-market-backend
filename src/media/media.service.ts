import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Media } from './entities';
import { FilesService } from '../file/file.service';
import { CreateMediaDto, UpdateMediaDto } from './dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)private mediaRepository: Repository<Media>,
    private fileService: FilesService,
  ){}

  async createMedia(createMediaDto: CreateMediaDto, photo:any):Promise<Object> {
    const file = await this.fileService.createFile(photo);

    const new_media = await this.mediaRepository.save({...createMediaDto, product_id:Number(createMediaDto.product) ,link:`http://localhost:4000/api/${file}`})

    return {
            message:"Succesfully Created",
            category: new_media,
            status:HttpStatus.OK,
    }
  }

  async findAllMedia():Promise<Object> {
    const medias = await this.mediaRepository.find()

    if(!medias) return{
                          message:"Medias Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            medias,
            status:HttpStatus.OK
    }
  }

  async findOneMedia(id: number) {
    const media = await this.mediaRepository.findBy({media_id:id})

    if(!media) return{
                          message:"Media Not Found",
                          status: HttpStatus.NOT_FOUND
    }

    return {
            media,
            status:HttpStatus.OK
    }
  }

  async updateMedia(id: number, updateMediaDto: UpdateMediaDto, photo:any) {
    const file = await this.fileService.createFile(photo);

     const updated_category = await this.mediaRepository.update(
      {
        media_id:id
      },
      {
        ...updateMediaDto,
        product_id:Number(updateMediaDto.product),
        link:`http://localhost:4000/api/${file}`
      }
     )

     return {
              message:"Succesfully Updated",
              status:HttpStatus.OK,
              updated_category
     }
  }

  async removeMedia(id: number):Promise<Object> {
      const [media] = await this.mediaRepository.findBy({media_id:id})
      if(!media) return {
                            message:"Media Not Found",
                            status:HttpStatus.CONFLICT
      }

      await this.mediaRepository.delete({media_id:id})

      return {
              message:"Succesfully Deleted",
              status:HttpStatus.OK
      }
  }
}
