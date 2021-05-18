import { Id } from '../value-objects/id';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';
import * as Joi from 'joi';

export class Account {
  private static id: Id;
  private static firstName: AccountFirstName;
  private static lastName: AccountLastName;
  private static email: AccountEmail;
  private static password: AccountPassword;
  private static createdAt: CreatedAt;
  private static updatedAt: UpdatedAt;

  get id(): Id {
    return Account.id;
  }

  set id(value: Id) {
    Joi.assert(value, Joi.object().instance(Id));
    Account.id = value;
  }

  get firstName(): AccountFirstName {
    return Account.firstName;
  }

  set firstName(value: AccountFirstName) {
    Joi.assert(value, Joi.object().instance(AccountFirstName));
    Account.firstName = value;
  }

  get lastName(): AccountLastName {
    return Account.lastName;
  }

  set lastName(value: AccountLastName) {
    Joi.assert(value, Joi.object().instance(AccountLastName));
    Account.lastName = value;
  }

  get email(): AccountEmail {
    return Account.email;
  }

  set email(value: AccountEmail) {
    Joi.assert(value, Joi.object().instance(AccountEmail));
    Account.email = value;
  }

  get password(): AccountPassword {
    return Account.password;
  }

  set password(value: AccountPassword) {
    Joi.assert(value, Joi.object().instance(AccountPassword));
    Account.password = value;
  }

  get createdAt(): CreatedAt {
    return Account.createdAt;
  }

  set createdAt(value: CreatedAt) {
    Joi.assert(value, Joi.object().instance(CreatedAt));
    Account.createdAt = value;
  }

  get updatedAt(): UpdatedAt {
    return Account.updatedAt;
  }

  set updatedAt(value: UpdatedAt) {
    Joi.assert(value, Joi.object().instance(UpdatedAt));
    Account.updatedAt = value;
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
