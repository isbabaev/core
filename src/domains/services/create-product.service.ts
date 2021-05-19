import { ICreateProductUseCase } from '../ports/in/create-product/create-product.use-case';
import { IAddProductToPersistencePort } from '../ports/out/persistence/add-product-to-persistence.port';
import { ICreateProductResult } from '../ports/in/create-product/create-product.result';
import { CreateProductCommand } from '../ports/in/create-product/create-product.command';
import { v4 as uuidv4 } from 'uuid';
import { Id } from '../value-objects/id';
import { Product } from '../entities/product';
import { ILoadAccountByIdPort } from '../ports/out/persistence/load-account-by-id.port';

export class CreateProductService implements ICreateProductUseCase {
  constructor(private readonly addProductToPersistencePort: IAddProductToPersistencePort,
              private readonly loadAccountByIdPort: ILoadAccountByIdPort) {
  }

  async createProduct(command: CreateProductCommand): Promise<ICreateProductResult> {
    const {name, description, photoUris, price, sellerId} = command;

    const seller = await this.loadAccountByIdPort.loadAccountById(sellerId);

    if (seller === null) {
      throw Error('Seller not found');
    }

    const productId = new Id(uuidv4());
    const product = new Product(productId, name, description, photoUris, price, seller);

    await this.addProductToPersistencePort.addProductToPersistence(product);

    return {id: productId};
  }
}
