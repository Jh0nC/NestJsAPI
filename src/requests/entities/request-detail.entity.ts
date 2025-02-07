import { Expose } from 'class-transformer';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Request } from './request.entity';

@Entity()
export class RequestDetail {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  /* Foreign key to User */
  @ManyToOne(() => Request, (request) => request.id)
  @Expose()
  request: Request;

  /* Foreign key to User */
  @ManyToOne(() => Product, (product) => product.id)
  @Expose()
  product: Product;

  @Column({ type: 'int' })
  @Expose()
  quantity: number;
}
