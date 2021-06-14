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

  get description(): ProductDescription {
    return this._description;
  }

  set description(value: ProductDescription) {
    if (value == null) {
      throw new Error('description is null or undefined');
    }
    this._description = value;

    this.updateUpdatedAt();
  }

  get photoUris(): ProductPhotoUri[] {
    return this._photoUris;
  }

  set photoUris(value: ProductPhotoUri[]) {
    if (value == null) {
      throw new Error('photoUris is null or undefined');
    }
    this._photoUris = value;

    this.updateUpdatedAt();
  }

  get price(): Price {
    return this._price;
  }

  set price(value: Price) {
    if (value == null) {
      throw new Error('price is null or undefined');
    }
    this._price = value;

    this.updateUpdatedAt();
  }

  get seller(): Account {
    return this._seller;
  }

  set seller(value: Account) {
    if (value == null) {
      throw new Error('seller is null or undefined');
    }
    this._seller = value;

    this.updateUpdatedAt();
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
              seller: Account,
              requestAccount: Account) {
    if (requestAccount.id !== seller.id) {
      throw new Error('the user does not have access to create product');
    }

    if (id == null) {
      throw new Error('id is null or undefined');
    }
    this._id = id;
    this.setName(name, requestAccount);
    this.description = description;
    this.photoUris = photoUris;
    this.price = price;
    this.seller = seller;
    this._createdAt = new CreatedAt(new Date());
    this.updateUpdatedAt();
  }

  private updateUpdatedAt(): void {
    this._updatedAt = new UpdatedAt(new Date());
  }

  setName(productName: ProductName, requestAccount: Account) {
    if (requestAccount.id !== this.seller.id) {
      throw new Error('the user does not have access to edit the name');
    }

    if (productName == null) {
      throw new Error('name is null or undefined');
    }

    this._name = productName;

    this.updateUpdatedAt();
  }
}
