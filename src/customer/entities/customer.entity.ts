import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('customer')
export class Customer {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  customer_id: number;

  @ApiProperty({ example: 'Xasan', description: 'Customer first name'})
  @Column({type: 'text'})
  first_name: string;

  @ApiProperty({ example: 'Avalov', description: 'Customer last name'})
  @Column({type: 'text'})
  last_name: string;

  @ApiProperty({ example: '+998931208896', description: 'Customer phone'})
  @Column({type: 'text'})
  phone: string;

  @ApiProperty({ example: ')(*&^%$#@!QWERTYUIOLKJHGFDSAZXCVBNM#$%^', description: 'Customer hashed token'})
  @Column({type: 'text'})
  hashed_token: string;

  @ApiProperty({ example: true, description: 'Customer active?'})
  @Column({ default: true })
  is_active: boolean;
}