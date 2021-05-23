import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { AccountPersistence } from './account-persistence';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { array: true, name: 'photo_urls' })
  photoUrls: string[];

  @Column()
  price: number;

  @ManyToOne(() => AccountPersistence)
  @JoinColumn({ name: 'seller_id' })
  seller: AccountPersistence;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
