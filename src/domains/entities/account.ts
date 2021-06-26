import { Id } from '../value-objects/id';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';
import { AccountRole } from '../value-objects/account/account-role';

export class Account {
  private readonly _id: Id;
  private _firstName: AccountFirstName;
  private _lastName: AccountLastName;
  private _email: AccountEmail;
  private _password: AccountPassword;
  private readonly _createdAt: CreatedAt;
  private _updatedAt: UpdatedAt;
  private _role: AccountRole;

  private set firstName(value: AccountFirstName) {
    if (value == null) {
      throw new Error('firstName is null or undefined');
    }

    this._firstName = value;
  }

  private set lastName(value: AccountLastName) {
    if (value == null) {
      throw new Error('lastName is null or undefined');
    }

    this._lastName = value;
  }

  private set email(value: AccountEmail) {
    if (value == null) {
      throw new Error('email is null or undefined');
    }

    this._email = value;
  }

  private set password(value: AccountPassword) {
    if (value == null) {
      throw new Error('password is null or undefined');
    }

    this._password = value;
  }

  private set role(value: AccountRole) {
    if (value == null) {
      throw new Error('role is null or undefined');
    }

    this._role = value;
  }

  get id(): Id {
    return this._id;
  }

  get createdAt(): CreatedAt {
    return this._createdAt;
  }

  get updatedAt(): UpdatedAt {
    return this._updatedAt;
  }

  constructor(id: Id,
              firstName: AccountFirstName,
              lastName: AccountLastName,
              email: AccountEmail,
              password: AccountPassword,
              role: AccountRole) {
    if (id == null) {
      throw new Error('id is null or undefined');
    }

    this._id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this._createdAt = new CreatedAt(new Date());
    this.updateUpdatedAt();
  }

  private updateUpdatedAt(): void {
    this._updatedAt = new UpdatedAt(new Date());
  }

  setFirstName(firstName: AccountFirstName, requestAccount: Account): void {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.getRole().isAdmin() && !requestAccount.id.equalsTo(this.id)) {
      throw new Error('the user does not have access to edit the firstName');
    }

    this.firstName = firstName;

    this.updateUpdatedAt();
  }

  setLastName(lastName: AccountLastName, requestAccount: Account): void {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.getRole().isAdmin() && !requestAccount.id.equalsTo(this.id)) {
      throw new Error('the user does not have access to edit the lastName');
    }

    this.lastName = lastName;

    this.updateUpdatedAt();
  }

  setEmail(email: AccountEmail, requestAccount: Account): void {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.getRole().isAdmin() && !requestAccount.id.equalsTo(this.id)) {
      throw new Error('the user does not have access to edit the email');
    }

    this.email = email;

    this.updateUpdatedAt();
  }

  setPassword(password: AccountPassword, requestAccount: Account): void {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.getRole().isAdmin() && !requestAccount.id.equalsTo(this.id)) {
      throw new Error('the user does not have access to edit the password');
    }

    this.password = password;

    this.updateUpdatedAt();
  }

  setRole(role: AccountRole, requestAccount: Account): void {
    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    if (!requestAccount.getRole().isAdmin()) {
      throw new Error('the user does not have access to edit the role');
    }

    this.role = role;

    this.updateUpdatedAt();
  }

  getFirstName(): AccountFirstName {
    return this._firstName;
  }

  getLastName(): AccountLastName {
    return this._lastName;
  }

  getEmail(): AccountEmail {
    return this._email;
  }

  getPassword(): AccountPassword {
    return this._password;
  }

  getRole(): AccountRole {
    return this._role;
  }

  canDelete(requestAccount: Account): boolean {
/*    if (requestAccount == null) {
      throw new Error('requestAccount is null or undefined');
    }

    const isCurrentAccount = requestAccount.id.equalsTo(this.id);
    const isAdmin = requestAccount.getRole().isAdmin();

    return isAdmin || isCurrentAccount;*/
  }
  // TODO удаление аккаунта
}
