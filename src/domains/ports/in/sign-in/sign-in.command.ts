import { AccountEmail } from '../../../value-objects/account/account-email';
import { AccountPassword } from '../../../value-objects/account/account-password';
import * as Joi from 'joi';

export class SignInCommand {
  private _email: AccountEmail;
  private _password: AccountPassword;

  get email(): AccountEmail {
    return this._email;
  }

  set email(value: AccountEmail) {
    Joi.assert(value, Joi.object().instance(AccountEmail));
    this._email = value;
  }

  get password(): AccountPassword {
    return this._password;
  }

  set password(value: AccountPassword) {
    Joi.assert(value, Joi.object().instance(AccountPassword));
    this._password = value;
  }

  constructor(email: AccountEmail,
              password: AccountPassword) {
    this.email = email;
    this.password = password;
  }
}
