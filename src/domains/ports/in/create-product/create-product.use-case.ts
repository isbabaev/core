import { ICreateProductResult } from './create-product.result';
import { CreateProductCommand } from './create-product.command';

export const CreateProductUseCaseSymbol = Symbol('ICreateProductUseCase');

export interface ICreateProductUseCase {
  createProduct(command: CreateProductCommand): Promise<ICreateProductResult>;
}
