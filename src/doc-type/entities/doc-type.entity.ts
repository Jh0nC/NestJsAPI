import { User } from "src/users/entities/user.entity";
import { Column, OneToMany } from "typeorm";

export class DocType {

  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 5 })
  shortName: string;

  @OneToMany(() => User, (user) => user.id)
  user: User[];

}
