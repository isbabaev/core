import { ProductEntity } from './product.entity';
import { AccountEntity } from './account.entity';

export class PurchaseEntity {
  private _id: number;
  private _product: ProductEntity;
  private _buyer: AccountEntity;
  private _purchaseDate: Date;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get product(): ProductEntity {
    return this._product;
  }

  set product(value: ProductEntity) {
    this._product = value;
  }

  get buyer(): AccountEntity {
    return this._buyer;
  }

  set buyer(value: AccountEntity) {
    this._buyer = value;
  }

  get purchaseDate(): Date {
    return this._purchaseDate;
  }

  set purchaseDate(value: Date) {
    this._purchaseDate = value;
  }

  constructor(id: number,
              product: ProductEntity,
              buyer: AccountEntity,
              purchaseDate: Date) {

    this.id = id;
    this.product = product;
    this.buyer = buyer;
    this.purchaseDate = purchaseDate;
  }
}
