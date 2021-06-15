import { IUpdateProductNameUseCase } from '../../ports/in/update-product/update-product-name/update-product-name.use-case';
import { IUpdateProductDescriptionUseCase } from '../../ports/in/update-product/update-product-description/update-product-description.use-case';
import { ILoadProductByIdPort } from '../../ports/out/persistence/product/load-product-by-id.port';
import { IUpdateProductPort } from '../../ports/out/persistence/product/update-product.port';
import { ILoadAccountByIdPort } from '../../ports/out/persistence/load-account-by-id.port';
import { UpdateProductNameCommand } from '../../ports/in/update-product/update-product-name/update-product-name.command';
import { Product } from '../../entities/product';
import { UpdateProductDescriptionCommand } from '../../ports/in/update-product/update-product-description/update-product-description.command';
import { IUpdateProductPriceUseCase } from '../../ports/in/update-product/update-product-price/update-product-price.use-case';
import { UpdateProductPriceCommand } from '../../ports/in/update-product/update-product-price/update-product-price.command';

export class UpdateProductService implements IUpdateProductNameUseCase, IUpdateProductDescriptionUseCase,
  IUpdateProductPriceUseCase {

  constructor(private readonly loadProductByIdPort: ILoadProductByIdPort,
              private readonly updateProductPort: IUpdateProductPort,
              private readonly loadAccountByIdPort: ILoadAccountByIdPort) {
  }

  async updateProductName(command: UpdateProductNameCommand): Promise<Product> {
    const { id, name, accountId } = command;
    const product = await this.loadProductByIdPort.loadProductById(id);
    const requestAccount = await this.loadAccountByIdPort.loadAccountById(accountId);

    product.setName(name, requestAccount);

    await this.updateProductPort.updateProduct(product);
    return product;
  }

  async updateProductDescription(command: UpdateProductDescriptionCommand): Promise<Product> {
    const { id, description, accountId } = command;
    const product = await this.loadProductByIdPort.loadProductById(id);
    const requestAccount = await this.loadAccountByIdPort.loadAccountById(accountId);

    product.setDescription(description, requestAccount);

    await this.updateProductPort.updateProduct(product);
    return product;
  }

  async updateProductPrice(command: UpdateProductPriceCommand): Promise<Product> {
    const {id, price, requestAccountId} = command;
    const product = await this.loadProductByIdPort.loadProductById(id);
    const requestAccount = await this.loadAccountByIdPort.loadAccountById(requestAccountId);

    product.setPrice(price, requestAccount);

    await this.updateProductPort.updateProduct(product);
    return product;
  }
}
