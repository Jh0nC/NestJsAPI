import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from '../types/name.enum';
import { Expose } from 'class-transformer';

@Entity()
export class DocType {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ type: 'enum', enum: Name })
  @Expose()
  name: string;

  @Column({ length: 5, unique: true })
  @Expose()
  shortName: string;

  /* Do not appear in table schema */
  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
