import { UpdateProductPriceCommand } from './update-product-price.command';
import { Product } from '../../../../entities/product';

export interface IUpdateProductPriceUseCase {
  updateProductPrice(command: UpdateProductPriceCommand): Promise<Product>;
}
