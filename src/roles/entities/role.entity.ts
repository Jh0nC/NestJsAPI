import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Role {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 30, unique: true })
  name: string;

  @ManyToOne(() => State, (state) => state.id, { eager: true })
  state: State;

  @OneToMany(() => User, (user) => user.id)
  user: User[];
}
