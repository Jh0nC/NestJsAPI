import { Exclude, Expose } from 'class-transformer';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RequestDetail } from './request-detail.entity';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  /* Foreign key to User */
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @Expose()
  user: User;

  @Column({ type: 'timestamp', nullable: true })
  @Expose()
  deliveryDate: Date;

  /* Foreign key to State */
  @ManyToOne(() => State, (state) => state.id, { eager: true })
  state: State;

  @Column({ type: 'decimal' })
  @Expose()
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;

  /* Do not appear in table schema */
  @OneToMany(() => RequestDetail, (requestDetail) => requestDetail.request, {
    cascade: true,
    eager: true,
  })
  @Expose()
  details: RequestDetail[];
}
