import * as Joi from 'joi';
import { BaseValueObject } from './base-value-object';

export class Id extends BaseValueObject<string> {
  constructor(value: string) {
    console.log('Id', value);
    
    Joi.assert(value, Joi.string().uuid().required());
    super(value);
  }
}
