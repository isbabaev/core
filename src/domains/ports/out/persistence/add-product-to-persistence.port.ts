import { Product } from '../../../entities/product';

export const AddProductToPersistencePortSymbol = Symbol('IAddProductToPersistencePort');

export interface IAddProductToPersistencePort {
  addProductToPersistence(product: Product): Promise<void>;
}
