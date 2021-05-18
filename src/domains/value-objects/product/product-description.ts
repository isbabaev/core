import { BaseValueObject } from '../base-value-object';
import * as Joi from 'joi';

export class ProductDescription extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().min(10).max(2000).required());
    super(value);
  }
}
