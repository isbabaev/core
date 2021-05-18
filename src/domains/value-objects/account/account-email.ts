import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountEmail extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().email().required());
    super(value);
  }
}
