import { IAddProductToPersistencePort } from '../../../domains/ports/out/persistence/add-product-to-persistence.port';
import { Product } from '../../../domains/entities/product';
import { ProductMapper } from '../mappers/product.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddProductToPersistenceAdapter implements IAddProductToPersistencePort {
  constructor(@InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>) {
  }

  async addProductToPersistence(product: Product): Promise<void> {
    const productPersistence = ProductMapper.mapToPersistence(product);
    await this.productRepository.insert(productPersistence);
  }
}
