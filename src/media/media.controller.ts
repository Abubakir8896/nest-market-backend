import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMediaDto, UpdateMediaDto } from './dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createMedia(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.mediaService.createMedia(createMediaDto, image);
  }

  @Get('all')
  findAllMedia() {
    return this.mediaService.findAllMedia();
  }

  @Get('one/:id')
  findOneMedia(@Param('id') id: string) {
    return this.mediaService.findOneMedia(+id);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('image'))
  updateMedia(
    @Body() updateMediaDto: UpdateMediaDto,
    @Param() id:number,
    @UploadedFile() image: any
  ): Promise<Object> {
    return this.mediaService.updateMedia(id,updateMediaDto, image);
  }

  @Delete('delete/:id')
  removeMedia(@Param('id') id: string) {
    return this.mediaService.removeMedia(+id);
  }
}
