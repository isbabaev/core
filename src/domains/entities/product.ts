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
  private readonly _seller: Account;
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

  get photoUris(): ProductPhotoUri[] {
    return this._photoUris;
  }

  get price(): Price {
    return this._price;
  }

  get seller(): Account {
    return this._seller;
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

    if (seller == null) {
      throw new Error('seller is null or undefined');
    }

    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.id.equalsTo(seller.id)) {
      throw new Error('the user does not have access to create product');
    }

    if (id == null) {
      throw new Error('id is null or undefined');
    }

    this._id = id;
    this._seller = seller;
    this.setName(name, requestAccount);
    this.setDescription(description, requestAccount);
    this.setPhotoUris(photoUris, requestAccount);
    this.setPrice(price, requestAccount);
    this._createdAt = new CreatedAt(new Date());
    this.updateUpdatedAt();
  }

  private updateUpdatedAt(): void {
    this._updatedAt = new UpdatedAt(new Date());
  }

  setName(productName: ProductName, requestAccount: Account): void {
    if (!requestAccount.id.equalsTo(this.seller.id)) {
      throw new Error('the user does not have access to edit the name');
    }

    if (productName == null) {
      throw new Error('name is null or undefined');
    }

    this._name = productName;

    this.updateUpdatedAt();
  }

  setDescription(productDescription: ProductDescription, requestAccount: Account): void {
    if (!requestAccount.id.equalsTo(this.seller.id)) {
      throw new Error('the user does not have access to edit the description');
    }

    if (productDescription == null) {
      throw new Error('description is null or undefined');
    }

    this._description = productDescription;

    this.updateUpdatedAt();
  }

  setPhotoUris(productPhotoUris: ProductPhotoUri[], requestAccount: Account): void {
    if (!requestAccount.id.equalsTo(this.seller.id)) {
      throw new Error('the user does not have access to edit the photoUris');
    }

    if (productPhotoUris == null) {
      throw new Error('photoUris is null or undefined');
    }

    this._photoUris = productPhotoUris;

    this.updateUpdatedAt();
  }

  setPrice(productPrice: Price, requestAccount: Account): void {
    if (!requestAccount.id.equalsTo(this.seller.id)) {
      throw new Error('the user does not have access to edit the price');
    }

    if (productPrice == null) {
      throw new Error('price is null or undefined');
    }

    this._price = productPrice;

    this.updateUpdatedAt();
  }

  canDelete(requestAccount: Account): boolean {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    return requestAccount.id.equalsTo(this.seller.id);
  }
}
