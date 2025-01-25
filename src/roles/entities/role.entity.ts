import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import { Name } from '../types/name.enum';
import { Expose } from 'class-transformer';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ type: 'enum', enum: Name })
  @Expose()
  name: string;

  /* Foreign key to State */
  @ManyToOne(() => State, (state) => state.id, { eager: true })
  @Expose()
  state: State;

  /* Do not appear in table schema */
  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
