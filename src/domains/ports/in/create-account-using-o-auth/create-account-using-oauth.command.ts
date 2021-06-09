import { AccountFirstName } from '../../../value-objects/account/account-first-name';
import { AccountLastName } from '../../../value-objects/account/account-last-name';
import { AccountEmail } from '../../../value-objects/account/account-email';
import * as Joi from 'joi';

export class CreateAccountUsingOAuthCommand {
  private _firstName: AccountFirstName;
  private _lastName: AccountLastName;
  private _email: AccountEmail;

  get firstName(): AccountFirstName {
    return this._firstName;
  }

  set firstName(value: AccountFirstName) {
    Joi.assert(value, Joi.object().instance(AccountFirstName));
    this._firstName = value;
  }

  get lastName(): AccountLastName {
    return this._lastName;
  }

  set lastName(value: AccountLastName) {
    Joi.assert(value, Joi.object().instance(AccountLastName));
    this._lastName = value;
  }

  get email(): AccountEmail {
    return this._email;
  }

  set email(value: AccountEmail) {
    Joi.assert(value, Joi.object().instance(AccountEmail));
    this._email = value;
  }

  constructor(firstName: AccountFirstName, lastName: AccountLastName, email: AccountEmail) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
