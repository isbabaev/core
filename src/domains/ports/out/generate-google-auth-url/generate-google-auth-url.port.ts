import { Uri } from '../../../value-objects/uri';

export const GenerateGoogleAuthUrlPortSymbol = Symbol('GenerateGoogleAuthUrlPort');

export interface IGenerateGoogleAuthUrlPort {
  generateGoogleAuthPort(): Uri;
}
