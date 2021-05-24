import { AccountPersistence } from './account-persistence';

export class ProductPersistence {
  id: number;
  name: string;
  description: string;
  photoUrls: string[];
  price: number;
  seller: AccountPersistence;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: number,
              name: string,
              description: string,
              photoUrls: string[],
              price: number,
              seller: AccountPersistence,
              createdAt: Date,
              updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photoUrls = photoUrls;
    this.price = price;
    this.seller = seller;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
