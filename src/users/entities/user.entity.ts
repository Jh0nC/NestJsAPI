import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { DocType } from 'src/doc-type/entities/doc-type.entity';
import { Role } from 'src/roles/entities/role.entity';
import { State } from 'src/states/entities/state.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  @Expose()
  role: Role;

  @ManyToOne(() => State, (state) => state.id, { eager: true })
  @Expose()
  state: State;

  @ManyToOne(() => DocType, (docType) => docType.id, { eager: true })
  @Expose()
  docType: DocType;

  @Column({ length: 15 })
  @Exclude()
  document: string;

  @Column({ length: 60 })
  firstName: string;

  @Column({ length: 60 })
  lastName: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ length: 1000 })
  address: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 1000 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
