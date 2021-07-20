import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn, PrimaryColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { AccountEntity } from './account.entity';

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryColumn()
  id: string;

  @ManyToMany(() => ProductEntity)
  products: ProductEntity[];

  @ManyToOne(() => AccountEntity)
  @JoinColumn({name: 'buyer_id'})
  buyer: AccountEntity;

  @Column({name: 'purchase_date'})
  purchaseDate: Date;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
}
