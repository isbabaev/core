import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountPassword extends BaseValueObject<string | null> {
  constructor(value: string | null) {
    Joi.assert(value, Joi.string());
    super(value);
  }
}
