import { Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { CreateProductDto, CreateProductResultDto } from '../dto/create-product.dto';
import {
  CreateProductUseCaseSymbol,
  ICreateProductUseCase,
} from '../../../domains/ports/in/create-product/create-product.use-case';
import { CreateProductCommand } from '../../../domains/ports/in/create-product/create-product.command';
import { ProductName } from '../../../domains/value-objects/product/product-name';
import { ProductDescription } from '../../../domains/value-objects/product/product-description';
import { ProductPhotoUri } from '../../../domains/value-objects/product/product-photo-uri';
import BigNumber from 'bignumber.js';
import { Id } from '../../../domains/value-objects/id';
import { Price } from '../../../domains/value-objects/price';
import { ApiResponse } from '@nestjs/swagger';

@Controller('/create-product')
export class CreateProductController {
  constructor(@Inject(CreateProductUseCaseSymbol)
              private readonly createProductUseCase: ICreateProductUseCase) {
  }

  /*@Post()
  @ApiResponse({status: HttpStatus.CREATED, type: CreateProductResultDto})
  async createProduct(createProductData: CreateProductDto): Promise<CreateProductResultDto> {
    const { name, description, photoUris, price, sellerId } = createProductData;
    const productPhotoUris = photoUris.map(photoUri => new ProductPhotoUri(photoUri));
    const createProductResult = await this.createProductUseCase.createProduct(
      new CreateProductCommand(
        new ProductName(name),
        new ProductDescription(description),
        productPhotoUris,
        new Price(new BigNumber(price)),
        new Id(sellerId),
      ),
    );
    return { id: createProductResult.id.value };
  }*/
}
