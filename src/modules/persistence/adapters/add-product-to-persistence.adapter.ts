import { IAddProductToPersistencePort } from '../../../domains/ports/out/persistence/add-product-to-persistence.port';
import { Product } from '../../../domains/entities/product';
import { ClientProxy } from '@nestjs/microservices';
import { ProductMapper } from '../mappers/product.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddProductToPersistenceAdapter implements IAddProductToPersistencePort {
  constructor(private readonly clientProxy: ClientProxy) {
  }

  addProductToPersistence(product: Product): Promise<void> {
    const productPersistence = ProductMapper.mapToPersistence(product);
    return this.clientProxy.send('create-product', productPersistence).toPromise();
  }
}
