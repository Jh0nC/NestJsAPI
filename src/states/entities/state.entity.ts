import { Expose } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ length: 30, unique: true })
  @Expose()
  name: string;

  /* Do not aappear in table schema */
  @OneToMany(() => Role, (role) => role.id)
  roles: Role[];

  /* Do not aappear in table schema */
  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
