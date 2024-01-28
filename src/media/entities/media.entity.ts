import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities';

@Entity('media')
export class Media {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  media_id: number;

  @ApiProperty({ example: 'image.png', description: 'Product Photo'})
  @Column({type: 'text'})
  link: string;

  @ApiProperty({ example: '1', description: 'Product ID'})
  @Column({type: 'integer'})
  product_id: number;

  @ManyToOne(() => Product, product => product.photos)
  product: Product;
}