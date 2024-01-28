import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Media } from './entities';
import { FilesModule } from '../file/file.module';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Media
      ]
    ),
    FilesModule
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}