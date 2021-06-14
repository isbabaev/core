import { Id } from '../value-objects/id';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';

export class Account {
  private _id: Id;
  private _firstName: AccountFirstName;
  private _lastName: AccountLastName;
  private _email: AccountEmail;
  private _password: AccountPassword;
  private _createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;

  get id(): Id {
    return this._id;
  }

  set id(value: Id) {
    this._id = value;
  }

  get firstName(): AccountFirstName {
    return this._firstName;
  }

  set firstName(value: AccountFirstName) {
    this._firstName = value;
  }

  get lastName(): AccountLastName {
    return this._lastName;
  }

  set lastName(value: AccountLastName) {
    this._lastName = value;
  }

  get email(): AccountEmail {
    return this._email;
  }

  set email(value: AccountEmail) {
    this._email = value;
  }

  get password(): AccountPassword {
    return this._password;
  }

  set password(value: AccountPassword) {
    this._password = value;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  set createdAt(value: CreatedAt) {
    this._createdAt = value;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  set updatedAt(value: UpdatedAt) {
    this._updatedAt = value;
  }

  constructor(id: Id,
              firstName: AccountFirstName,
              lastName: AccountLastName,
              email: AccountEmail,
              password: AccountPassword,
              createdAt: CreatedAt,
              updatedAt: CreatedAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
