import { Id } from '../../../../value-objects/id';
import { Price } from '../../../../value-objects/price';

export class UpdateProductPriceCommand {
  readonly id: Id;
  readonly price: Price;
  readonly requestAccountId: Id;

  constructor(id: Id, price: Price, requestAccountId: Id) {
    this.id = id;
    this.price = price;
    this.requestAccountId = requestAccountId;
  }
}
