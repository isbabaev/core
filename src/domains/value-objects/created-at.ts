import { BaseValueObject } from './base-value-object';
import * as Joi from 'joi';

export class CreatedAt extends BaseValueObject<Date> {
  constructor(value: Date) {
    Joi.assert(value, Joi.date().required());
    super(value);
  }
}
