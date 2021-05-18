import { AccountEntity } from './account.entity';
import { Id } from '../value-objects/id';
import { ProductName } from '../value-objects/product/product-name';
import { ProductDescription } from '../value-objects/product/product-description';
import { ProductPhotoUri } from '../value-objects/product/product-photo-uri';
import { Price } from '../value-objects/price';

export class ProductEntity { // TODO remove entity
  private id: Id;
  private name: ProductName;
  private description: ProductDescription;
  private photoUris: ProductPhotoUri[];
  private price: Price;
  private seller: AccountEntity;

  constructor(id: Id,
              name: ProductName,
              description: ProductDescription,
              photoUris: ProductPhotoUri[],
              price: Price,
              seller: AccountEntity) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.seller = seller;
  }
}
