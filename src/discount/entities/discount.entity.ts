import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { DiscountProduct } from '../../discount_product/entities';

@Entity('discount')
export class Discount {
  @PrimaryGeneratedColumn('increment')
  discount_id: number;

  @Column({type: 'text'})
  name: string;

  @Column({type: 'text'})
  persentage: string;

  @Column({type: 'date'})
  start_date: Date;

  @Column({type: 'date'})
  end_date: Date;
  
  @ManyToMany(() => DiscountProduct, discount_product => discount_product.discount)
  product_discount: DiscountProduct;
}