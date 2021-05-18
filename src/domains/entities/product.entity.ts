import { BigNumber } from 'bignumber.js';
import { AccountEntity } from './account.entity';
import { Id } from '../value-objects/id';
import { ProductName } from '../value-objects/product/product-name';
import { ProductDescription } from '../value-objects/product/product-description';

export class ProductEntity { // TODO remove entity
  private id: Id;
  private name: ProductName;
  private description: ProductDescription;
  private _photoUrls: string[];
  private _price: BigNumber;
  private _seller: AccountEntity;

  get photoUrls(): string[] {
    return this._photoUrls;
  }

  set photoUrls(value: string[]) {
    this._photoUrls = value;
  }

  get price(): BigNumber {
    return this._price;
  }

  set price(value: BigNumber) {
    this._price = value;
  }

  get seller(): AccountEntity {
    return this._seller;
  }

  set seller(value: AccountEntity) {
    this._seller = value;
  }

  constructor(id: Id,
              name: ProductName,
              description: ProductDescription,
              photoUrls: string[],
              price: BigNumber,
              seller: AccountEntity) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUrls = photoUrls;
    this.price = price;
    this.seller = seller;
  }
}
