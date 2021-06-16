import { Id } from '../../../../value-objects/id';

export interface IDeleteProductByIdPort {
  deleteProductById(id: Id): Promise<void>;
}
