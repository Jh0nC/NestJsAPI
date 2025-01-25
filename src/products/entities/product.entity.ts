import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { ProductDetail } from './product-detail.entity';
import { State } from 'src/states/entities/state.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ length: 200, unique: true })
  @Expose()
  name: string;

  /* Foreign key to ProductCategory */
  @ManyToOne(() => ProductCategory, (productCategory) => productCategory.id, {
    eager: true,
  })
  @Expose()
  category: ProductCategory;

  /* Foreign key to State */
  @ManyToOne(() => State, (state) => state.id, { eager: true })
  @Expose()
  state: State;

  @Column({ length: 300 })
  @Expose()
  description: string;

  @Column({ length: 1000 })
  @Expose()
  image: string;

  @Column({ type: 'int', default: 0.0 })
  @Expose()
  stock: number;

  @Column({ type: 'decimal' })
  @Expose()
  price: number;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  /* Do not appear in table schema */
  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product, {
    cascade: true,
    eager: true,
  })
  @Expose()
  details: ProductDetail[];
}
