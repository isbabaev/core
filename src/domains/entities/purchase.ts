import { Product } from './product';
import { Account } from './account';
import { Id } from '../value-objects/id';
import { PurchaseDate } from '../value-objects/purchase/purchase-date';

export class Purchase {
  private static id: Id;
  private static product: Product;
  private static buyer: Account;
  private static purchaseDate: PurchaseDate;

  get id(): Id {
    return Purchase.id;
  }

  set id(value: Id) {
    Purchase.id = value;
  }

  get product(): Product {
    return Purchase.product;
  }

  set product(value: Product) {
    Purchase.product = value;
  }

  get buyer(): Account {
    return Purchase.buyer;
  }

  set buyer(value: Account) {
    Purchase.buyer = value;
  }

  get purchaseDate(): PurchaseDate {
    return Purchase.purchaseDate;
  }

  set purchaseDate(value: PurchaseDate) {
    Purchase.purchaseDate = value;
  }

  constructor(id: Id,
              product: Product,
              buyer: Account,
              purchaseDate: PurchaseDate) {
    this.id = id;
    this.product = product;
    this.buyer = buyer;
    this.purchaseDate = purchaseDate;
  }
}
