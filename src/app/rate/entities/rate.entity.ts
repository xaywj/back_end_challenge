import { Product } from 'src/app/product/entities/product.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  rate: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

 
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToOne(() => Product, (product) => product.rate)
  product: Product;
}
