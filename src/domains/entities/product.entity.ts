import { BigNumber } from 'bignumber.js';
import { AccountEntity } from './account.entity';

export class ProductEntity {
  private _id: number;
  private _name: string;
  private _description: string;
  private _photoUrls: string[];
  private _price: BigNumber;
  private _seller: AccountEntity;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

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

  constructor(id: number,
              name: string,
              description: string,
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
