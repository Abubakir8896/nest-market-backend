import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../category/entities';
import { Media } from '../../media/entities/media.entity';

@Entity('product')
export class Product {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  product_id: number;

  @ApiProperty({ example: 'Olma', description: 'Product name'})
  @Column({type: 'text'})
  name: string;

  @ApiProperty({ example: '10$', description: 'Product price'})
  @Column({type: 'text'})
  price: string;

  @ApiProperty({ example: '500', description: 'Product total count'})
  @Column({type: 'integer'})
  total_count: number;

  @ApiProperty({ example: '12-01-2024', description: 'Product create date'})
  @Column({type: 'date'})
  mfg: Date;

  @ApiProperty({ example: '200 days', description: 'Product life'})
  @Column({type: 'text'})
  life: string;

  @ApiProperty({ example: 'kg', description: 'Product value'})
  @Column({type: 'text'})
  value: string;

  @ApiProperty({ example: 'Nash sad', description: 'Product brand name'})
  @Column({type: 'text'})
  brand: string;

  @ApiProperty({ example: '12-01-2025', description: 'Create At'})
  @Column({type: 'date'})
  created_at: Date;

  @ApiProperty({ example: '12-01-2025', description: 'Update At'})
  @Column({type: 'date'})
  updated_at: Date;
  
  @ApiProperty({ example: '4.5', description: 'Product Raiting'})
  @Column({type: 'integer', default:0})
  rating: number;
  
  @ApiProperty({ example: true, description: 'Product is active'})
  @Column({type: 'boolean', default:true})
  is_active: boolean;

  @ApiProperty({ example: 'Hi its a good product', description: 'Product description'})
  @Column({type: 'text'})
  description: string;

  @ApiProperty({ example: '1', description: 'Product Category ID'})
  @Column({type: 'integer'})
  category_id: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => Media, media => media.product)
  photos: Media[];
}