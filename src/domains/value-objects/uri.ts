import { BaseValueObject } from './base-value-object';
import * as Joi from 'joi';

export class Uri extends BaseValueObject<string> {
  constructor(value: string) {
    Joi.assert(value, Joi.string().uri().required());
    super(value);
  }
}
