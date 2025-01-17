import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class State {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 30, unique: true, default: false })
  name: string;

  @OneToMany(() => Role, (role) => role.id)
  roles: Role[];

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
