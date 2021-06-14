import { Account } from './account';
import { Id } from '../value-objects/id';
import { ProductName } from '../value-objects/product/product-name';
import { ProductDescription } from '../value-objects/product/product-description';
import { ProductPhotoUri } from '../value-objects/product/product-photo-uri';
import { Price } from '../value-objects/price';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';

export class Product {
  private readonly _id: Id;
  private _name: ProductName;
  private _description: ProductDescription;
  private _photoUris: ProductPhotoUri[];
  private _price: Price;
  private _seller: Account;
  private readonly _createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;

  get id(): Id {
    return this._id;
  }

  get name(): ProductName {
    return this._name;
  }

  set name(value: ProductName) {
    this._name = value;

    this.changeUpdatedAt();
  }

  get description(): ProductDescription {
    return this._description;
  }

  set description(value: ProductDescription) {
    this._description = value;

    this.changeUpdatedAt();
  }

  get photoUris(): ProductPhotoUri[] {
    return this._photoUris;
  }

  set photoUris(value: ProductPhotoUri[]) {
    this._photoUris = value;

    this.changeUpdatedAt();
  }

  get price(): Price {
    return this._price;
  }

  set price(value: Price) {
    this._price = value;

    this.changeUpdatedAt();
  }

  get seller(): Account {
    return this._seller;
  }

  set seller(value: Account) {
    this._seller = value;

    this.changeUpdatedAt();
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  constructor(id: Id,
              name: ProductName,
              description: ProductDescription,
              photoUris: ProductPhotoUri[],
              price: Price,
              seller: Account) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.seller = seller;
    this._createdAt = new CreatedAt(new Date());
  }

  private changeUpdatedAt(): void {
    this._updatedAt = new UpdatedAt(new Date());
  }
}
