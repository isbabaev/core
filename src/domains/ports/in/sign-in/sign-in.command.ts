import { AccountEmail } from '../../../value-objects/account/account-email';
import * as Joi from 'joi';

export class SignInCommand {
  private _email: AccountEmail;
  private _password: string;

  get email(): AccountEmail {
    return this._email;
  }

  set email(value: AccountEmail) {
    Joi.assert(value, Joi.object().instance(AccountEmail));
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    Joi.assert(value, Joi.string());
    this._password = value;
  }

  constructor(email: AccountEmail,
              password: string) {
    this.email = email;
    this.password = password;
  }
}
