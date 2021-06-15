import { ProductName } from '../../../../value-objects/product/product-name';
import { Id } from '../../../../value-objects/id';

export class UpdateProductNameCommand {
  readonly id: Id;
  readonly name: ProductName;
  readonly accountId: Id;

  constructor(id: Id, name: ProductName, accountId: Id) {
    this.id = id;
    this.name = name;
    this.accountId = accountId;
  }
}
