import { Role } from "src/roles/entities/role.entity";
import { User } from "src/users/entities/user.entity";
import { Column, OneToMany } from "typeorm";

export class State {

  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 30 })
  name: string;

  @OneToMany(() => Role, (role) => role.id)
  roles: Role[];

  @OneToMany(() => User, (user) => user.id)
  user: User[];

}
