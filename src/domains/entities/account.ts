import { Id } from '../value-objects/id';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';

export class Account {
  private readonly _id: Id;
  private _firstName: AccountFirstName;
  private _lastName: AccountLastName;
  private _email: AccountEmail;
  private _password: AccountPassword;
  private readonly _createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;

  get id(): Id {
    return this._id;
  }

  get firstName(): AccountFirstName {
    return this._firstName;
  }

  set firstName(value: AccountFirstName) {
    this._firstName = value;

    this.changeUpdatedAt();
  }

  get lastName(): AccountLastName {
    return this._lastName;
  }

  set lastName(value: AccountLastName) {
    this._lastName = value;

    this.changeUpdatedAt();
  }

  get email(): AccountEmail {
    return this._email;
  }

  set email(value: AccountEmail) {
    this._email = value;

    this.changeUpdatedAt();
  }

  get password(): AccountPassword {
    return this._password;
  }

  set password(value: AccountPassword) {
    this._password = value;

    this.changeUpdatedAt();
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  set updatedAt(value: UpdatedAt) {
    this._updatedAt = value;

    this.changeUpdatedAt();
  }

  constructor(id: Id,
              firstName: AccountFirstName,
              lastName: AccountLastName,
              email: AccountEmail,
              password: AccountPassword) {
    this._id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this._createdAt = new CreatedAt(new Date());
    this.changeUpdatedAt();
  }

  private changeUpdatedAt(): void {
    this._updatedAt = new UpdatedAt(new Date());
  }
}
