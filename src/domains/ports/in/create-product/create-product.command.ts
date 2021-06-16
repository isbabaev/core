import { ProductName } from '../../../value-objects/product/product-name';
import { ProductDescription } from '../../../value-objects/product/product-description';
import { ProductPhotoUri } from '../../../value-objects/product/product-photo-uri';
import { Price } from '../../../value-objects/price';
import * as Joi from 'joi';
import { Id } from '../../../value-objects/id';

export class CreateProductCommand {
  private _name: ProductName;
  private _description: ProductDescription;
  private _photoUris: ProductPhotoUri[];
  private _price: Price;
  private _sellerId: Id;
  readonly requestAccountId: Id;

  get name(): ProductName {
    return this._name;
  }

  set name(value: ProductName) {
    Joi.assert(value, Joi.object().instance(ProductName));
    this._name = value;
  }

  get description(): ProductDescription {
    return this._description;
  }

  set description(value: ProductDescription) {
    Joi.assert(value, Joi.object().instance(ProductDescription));
    this._description = value;
  }

  get photoUris(): ProductPhotoUri[] {
    return this._photoUris;
  }

  set photoUris(value: ProductPhotoUri[]) {
    Joi.assert(value, Joi.array().items(Joi.object().instance(ProductPhotoUri)));
    this._photoUris = value;
  }

  get price(): Price {
    return this._price;
  }

  set price(value: Price) {
    Joi.assert(value, Joi.object().instance(Price));
    this._price = value;
  }

  get sellerId(): Id {
    return this._sellerId;
  }

  set sellerId(value: Id) {
    Joi.assert(value, Joi.object().instance(Id));
    this._sellerId = value;
  }

  constructor(name: ProductName,
              description: ProductDescription,
              photoUris: ProductPhotoUri[],
              price: Price,
              sellerId: Id,
              requestAccountId: Id) {
    this.name = name;
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.sellerId = sellerId;
    this.requestAccountId = requestAccountId;
  }
}
