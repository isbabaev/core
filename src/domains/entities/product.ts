import { Account } from './account';
import { Id } from '../value-objects/id';
import { ProductName } from '../value-objects/product/product-name';
import { ProductDescription } from '../value-objects/product/product-description';
import { ProductPhotoUri } from '../value-objects/product/product-photo-uri';
import { Price } from '../value-objects/price';
import * as Joi from 'joi';

export class Product {
  private static id: Id;
  private static _name: ProductName;
  private static description: ProductDescription;
  private static photoUris: ProductPhotoUri[];
  private static price: Price;
  private static seller: Account;

  get id(): Id {
    return Product.id;
  }

  set id(value: Id) {
    Joi.assert(value, Joi.object().instance(Id));
    Product.id = value;
  }

  get name(): ProductName {
    return Product._name;
  }

  set name(value: ProductName) {
    Joi.assert(value, Joi.object().instance(ProductName));
    Product._name = value;
  }

  get description(): ProductDescription {
    return Product.description;
  }

  set description(value: ProductDescription) {
    Joi.assert(value, Joi.object().instance(ProductDescription));
    Product.description = value;
  }

  get photoUris(): ProductPhotoUri[] {
    return Product.photoUris;
  }

  set photoUris(value: ProductPhotoUri[]) {
    Joi.assert(value, Joi.array().items(Joi.object().instance(ProductPhotoUri)));
    Product.photoUris = value;
  }

  get price(): Price {
    return Product.price;
  }

  set price(value: Price) {
    Joi.assert(value, Joi.object().instance(Price));
    Product.price = value;
  }

  get seller(): Account {
    return Product.seller;
  }

  set seller(value: Account) {
    Joi.assert(value, Joi.object().instance(Account));
    Product.seller = value;
  }

  constructor(id: Id,
              name: ProductName,
              description: ProductDescription,
              photoUris: ProductPhotoUri[],
              price: Price,
              seller: Account) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.seller = seller;
  }
}
