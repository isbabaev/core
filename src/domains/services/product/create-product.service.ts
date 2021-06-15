import { ICreateProductUseCase } from '../../ports/in/create-product/create-product.use-case';
import { IAddProductToPersistencePort } from '../../ports/out/persistence/add-product-to-persistence.port';
import { ICreateProductResult } from '../../ports/in/create-product/create-product.result';
import { CreateProductCommand } from '../../ports/in/create-product/create-product.command';
import { Id } from '../../value-objects/id';
import { Product } from '../../entities/product';
import { ILoadAccountByIdPort } from '../../ports/out/persistence/load-account-by-id.port';
import { IGenerateUuidPort } from '../../ports/out/uuid/generate-uuid.port';

export class CreateProductService implements ICreateProductUseCase {
  constructor(private readonly addProductToPersistencePort: IAddProductToPersistencePort,
              private readonly generateUuidPort: IGenerateUuidPort,
              private readonly loadAccountByIdPort: ILoadAccountByIdPort) {
  }

  async createProduct(command: CreateProductCommand): Promise<ICreateProductResult> {
    const {name, description, photoUris, price, sellerId, requestAccountId} = command;

    const seller = await this.loadAccountByIdPort.loadAccountById(sellerId);
    const requestAccount = await this.loadAccountByIdPort.loadAccountById(requestAccountId);

    const productUuid = this.generateUuidPort.generateUuid();
    const productId = new Id(productUuid);
    const product = new Product(productId, name, description, photoUris, price, seller, requestAccount);

    await this.addProductToPersistencePort.addProductToPersistence(product);

    return {id: productId};
  }
}
