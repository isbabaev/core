import { ProductEntity } from './product.entity';
import { AccountEntity } from './account.entity';
import { Id } from '../value-objects/id';
import { PurchaseDate } from '../value-objects/purchase/purchase-date';

export class PurchaseEntity {
  private id: Id;
  private product: ProductEntity;
  private buyer: AccountEntity;
  private purchaseDate: PurchaseDate;

  constructor(id: Id,
              product: ProductEntity,
              buyer: AccountEntity,
              purchaseDate: PurchaseDate) {

    this.id = id;
    this.product = product;
    this.buyer = buyer;
    this.purchaseDate = purchaseDate;
  }
}
