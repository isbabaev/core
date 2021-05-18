import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountPassword extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/).required());
    super(value);
  }
}