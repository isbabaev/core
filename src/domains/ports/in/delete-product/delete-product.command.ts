import { Id } from '../../../value-objects/id';

export class DeleteProductCommand {
  readonly productId: Id;
  readonly requestAccountId: Id;

  constructor(productId: Id, requestAccountId: Id) {
    this.productId = productId;
    this.requestAccountId = requestAccountId;
  }
}
