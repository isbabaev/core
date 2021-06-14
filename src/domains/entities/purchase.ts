import { Product } from './product';
import { Account } from './account';
import { Id } from '../value-objects/id';
import { PurchaseDate } from '../value-objects/purchase/purchase-date';

export class Purchase {
  private readonly _id: Id;
  private readonly _product: Product;
  private readonly _buyer: Account;
  private readonly _purchaseDate: PurchaseDate;

  get id(): Id {
    return this._id;
  }

  get product(): Product {
    return this._product;
  }

  get buyer(): Account {
    return this._buyer;
  }

  get purchaseDate(): PurchaseDate {
    return this._purchaseDate;
  }

  constructor(id: Id,
              product: Product,
              buyer: Account) {
    this._id = id;
    this._product = product;
    this._buyer = buyer;
    this._purchaseDate = new PurchaseDate(new Date());
  }
}
