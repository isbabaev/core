import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountPassword extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().required());
    super(value);
  }
}
