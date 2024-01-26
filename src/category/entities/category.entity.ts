import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../product/entities';

@Entity('category')
export class Category {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  category_id: number;

  @ApiProperty({ example: 'Avalov Xasan', description: 'Category name'})
  @Column({type: 'text'})
  name: string;

  @ApiProperty({ example: 'image.png', description: 'Photo category'})
  @Column({type: 'text'})
  photo: string;

  @ApiProperty({ example: 'Hi its a good product', description: 'Category description'})
  @Column({type: 'text'})
  description: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}