import { Id } from '../../../value-objects/id';

export const GenerateJwtTokenPortSymbol = Symbol('IGenerateJwtTokenPort');

export interface IGenerateJwtTokenPort {
  generateJwtToken(id: Id): string;
}
