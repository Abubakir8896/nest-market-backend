import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Discount } from '../../discount/entities';
import { Product } from '../../product/entities';

@Entity('discount_product')
export class DiscountProduct {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  product_discount_id: number;

  @Column({type: 'integer'})
  product_id: number;

  @Column({type: 'integer'})
  discount_id: number;

  @OneToMany(() => Product, product => product.discount)
  product: Product;

  @OneToMany(() => Discount, discount => discount.product_discount)
  discount: Discount;
}