import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class AccountLastName extends BaseValueObject<string> {
  constructor(value: string) {
    // Joi.assert(value, Joi.string().regex(/^[a-zA-Z]+$/).max(50).required()); TODO finish up
    super(value);
  }
}
