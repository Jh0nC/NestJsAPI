import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { State } from 'src/states/entities/state.entity';
import { Unit } from '../types/unit.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Check("unit IN ('gr', 'ml', 'und')")
export class Supply {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ length: 120, unique: true })
  @Expose()
  name: string;

  @Column({ type: 'float', default: 0.0 })
  @Expose()
  stock: number;

  @Column({ type: 'enum', enum: Unit })
  @Expose()
  unit: string;

  /* Foreign key to State */
  @ManyToOne(() => State, (state) => state.id, { eager: true })
  @Expose()
  state: State;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  updatedAt: Date;
}
