import { ProductEntity } from './product.entity';
import { IsEmail, validate } from 'class-validator';

export class AccountEntity {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  @IsEmail() private _email: string;
  private _password: string;
  private _products: ProductEntity[];
  private _createdAt: Date;
  private _updatedAt: Date;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get products(): ProductEntity[] {
    return this._products;
  }

  set products(value: ProductEntity[]) {
    this._products = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  private constructor(firstName: string,
              lastName: string,
              email: string,
              password: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static async create(firstName: string,
                      lastName: string,
                      email: string,
                      password: string): Promise<AccountEntity> {
    const account = new AccountEntity(firstName, lastName, email, password);

    const validationErrors = await validate(account);
    if (validationErrors.length > 0) {
      throw Error();
    }

    return account;
  }
}
