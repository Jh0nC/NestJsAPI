import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';
import { Supply } from 'src/supplies/entities/supply.entity';
import { Expose } from 'class-transformer';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  /* Foreign key to Product */
  @ManyToOne(() => Product, (product) => product.id)
  @Expose()
  product: Product;

  /* Foreign key to Supply */
  @ManyToOne(() => Supply, (supply) => supply.id)
  @Expose()
  supply: Supply;
}
