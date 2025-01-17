import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supply {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
