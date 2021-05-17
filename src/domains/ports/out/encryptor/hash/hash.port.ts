import { IHashResult } from './hash.result';

export const HashPortSymbol = Symbol('IHashPort');

export interface IHashPort {
  hash(data: any): Promise<IHashResult>;
}
