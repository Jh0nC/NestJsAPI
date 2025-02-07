import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Expose } from 'class-transformer';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ length: 100 })
  @Expose()
  name: string;

  @Column({ length: 500 })
  @Expose()
  description: string;

  /* Do not appear in table schema */
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
