import { ProductEntity } from './product.entity';
import { IsEmail, validate } from 'class-validator';

export class AccountEntity {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  @IsEmail()
  private _email: string;
  private _password: string;
  private _products: ProductEntity[];

  private get id(): number {
    return this._id;
  }

  private set id(value: number) {
    this._id = value;
  }

  private get firstName(): string {
    return this._firstName;
  }

  private set firstName(value: string) {
    this._firstName = value;
  }

  private get lastName(): string {
    return this._lastName;
  }

  private set lastName(value: string) {
    this._lastName = value;
  }

  private get email(): string {
    return this._email;
  }

  private set email(value: string) {
    this._email = value;
  }

  private get password(): string {
    return this._password;
  }

  private set password(value: string) {
    this._password = value;
  }

  private get products(): ProductEntity[] {
    return this._products;
  }

  private set products(value: ProductEntity[]) {
    this._products = value;
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
