import { IDeleteProductUseCase } from '../../ports/in/delete-product/delete-product.use-case';
import { DeleteProductCommand } from '../../ports/in/delete-product/delete-product.command';
import { ILoadProductByIdPort } from '../../ports/out/persistence/product/load-product-by-id.port';
import { ILoadAccountByIdPort } from '../../ports/out/persistence/load-account-by-id.port';
import { IDeleteProductByIdPort } from '../../ports/out/persistence/product/delete-product-by-id.port';

export class DeleteProductService implements IDeleteProductUseCase {
  constructor(private readonly loadProductByIdPort: ILoadProductByIdPort,
              private readonly loadAccountByIdPort: ILoadAccountByIdPort,
              private readonly deleteProductByIdPort: IDeleteProductByIdPort) {
  }

  async deleteProduct(command: DeleteProductCommand): Promise<boolean> {
    const {productId, requestAccountId} = command;
    const product = await this.loadProductByIdPort.loadProductById(productId);
    const requestAccount = await this.loadAccountByIdPort.loadAccountById(requestAccountId);

    const canDelete = product.canDelete(requestAccount);
    if (!canDelete) {
      return false;
    }

    await this.deleteProductByIdPort.deleteProductById(productId);
    return true;
  }
}
