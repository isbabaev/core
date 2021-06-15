import { Id } from '../../../../value-objects/id';
import { ProductDescription } from '../../../../value-objects/product/product-description';

export class UpdateProductDescriptionCommand {
  readonly id: Id;
  readonly description: ProductDescription;
  readonly accountId: Id;

  constructor(id: Id, description: ProductDescription, accountId: Id) {
    this.id = id;
    this.description = description;
    this.accountId = accountId;
  }
}
