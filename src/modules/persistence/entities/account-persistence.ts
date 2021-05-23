import { ProductEntity } from './product.entity';

export class AccountPersistence {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  products: ProductEntity[];
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string,
              firstName: string,
              lastName: string,
              email: string,
              password: string,
              products: ProductEntity[],
              createdAt: Date,
              updatedAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.products = products;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}