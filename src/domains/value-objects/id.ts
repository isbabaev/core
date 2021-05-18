import * as Joi from 'joi';
import { BaseValueObject } from './base-value-object';

export class Id extends BaseValueObject<number> {
  constructor(value: number) {
    Joi.assert(value, Joi.number().min(1).required());
    super(value);
  }
}
