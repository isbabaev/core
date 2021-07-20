import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn, PrimaryColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';
import { ColumnNumericTransformer } from '../transformers/numeric.transformer';

@Entity('products')
export class ProductEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { array: true, name: 'photo_uris' })
  photoUris: string[];

  @Column('numeric', {
    precision: 12,
    scale: 2,
    transformer: new ColumnNumericTransformer()
  })
  price: number;

  @JoinColumn({name: 'seller_id'})
  sellerId: string;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'seller_id' })
  seller: AccountEntity;

  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  constructor(id: string,
              name: string,
              description: string,
              photoUrls: string[],
              price: number,
              sellerId: string,
              createdAt: Date,
              updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUris = photoUrls;
    this.price = price;
    this.sellerId = sellerId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
