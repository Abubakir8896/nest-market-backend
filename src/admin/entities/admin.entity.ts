import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  admin_id: number;

  @ApiProperty({ example: 'Avalov Xasan', description: 'Admin name'})
  @Column({type: 'text'})
  name: string;

  @ApiProperty({ example: 'xasanavalov701@gmail.com', description: 'Admin email'})
  @Column({type: 'text'})
  email: string;

  @ApiProperty({ example: 'Abubakir20080808', description: 'Admin password'})
  @Column({type: 'text'})
  password: string;

  @ApiProperty({ example: '@#$IUYTGUJVWTFUTWCRWTCWCR^%$#@$Ze', description: 'Admin hashed token'})
  @Column({type: 'text'})
  hashed_token: string;

  @ApiProperty({ example: true, description: 'Admin active?'})
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ example: true, description: 'Admin is super admin?'})
  @Column({ default: false })
  is_super_admin: boolean;
}