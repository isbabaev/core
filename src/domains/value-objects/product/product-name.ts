import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class ProductName extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().min(5).max(500).required());
    super(value);
  }
}
