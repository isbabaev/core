import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountFirstName extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().regex(/^[a-zA-Z]+$/).max(50).required());
    super(value);
  }
}
