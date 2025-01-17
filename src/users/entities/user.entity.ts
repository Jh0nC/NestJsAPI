import { DocType } from "src/doc-type/entities/doc-type.entity";
import { Role } from "src/roles/entities/role.entity";
import { State } from "src/states/entities/state.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

  @Column({ primary: true, generated: true })
  id: number;

  @ManyToOne(() => Role, (role) => role.id, { eager: true })
  role: Role;

  @ManyToOne(() => State, (state) => state.id, { eager: true })
  state: State;

  @ManyToOne(() => DocType, (docType) => docType.id, { eager: true })
  docType: DocType;

  @Column({ length: 15 })
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
