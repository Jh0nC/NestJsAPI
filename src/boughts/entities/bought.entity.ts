import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { BoughtDetail } from './bought-detail.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Bought {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  /* Foreign key to User */
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @Expose()
  user: User;

  @Column({ length: 200 })
  @Expose()
  bill: string;

  @Column({ type: 'date' })
  @Expose()
  date: Date;

  @Column({ type: 'decimal' })
  @Expose()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  /* Do not appear in table schema */
  @OneToMany(() => BoughtDetail, (boughtDetail) => boughtDetail.bought, {
    cascade: true,
    eager: true,
  })
  @Expose()
  details: BoughtDetail[];
}
