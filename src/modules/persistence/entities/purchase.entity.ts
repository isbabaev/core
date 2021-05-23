import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { AccountPersistence } from './account-persistence';

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => ProductEntity)
  products: ProductEntity[];

  @ManyToOne(() => AccountPersistence)
  @JoinColumn({name: 'buyer_id'})
  buyer: AccountPersistence;

  @Column({name: 'purchase_date'})
  purchaseDate: Date;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
