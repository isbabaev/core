import { DeleteProductCommand } from './delete-product.command';

export interface IDeleteProductUseCase {
  deleteProduct(command: DeleteProductCommand): Promise<boolean>;
}
