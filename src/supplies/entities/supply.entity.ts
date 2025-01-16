import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Supply {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
