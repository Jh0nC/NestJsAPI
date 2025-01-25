import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bought } from './bought.entity';
import { Supply } from 'src/supplies/entities/supply.entity';
import { Expose } from 'class-transformer';

@Entity()
export class BoughtDetail {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  /* Foreign key to Bought */
  @ManyToOne(() => Bought, (bought) => bought.id)
  @Expose()
  bought: Bought;

  /* Foreign key to Supply */
  @OneToOne(() => Supply, { eager: true })
  @JoinColumn()
  @Expose()
  supply: Supply;

  @Column({ type: 'float' })
  @Expose()
  amount: number;
}
