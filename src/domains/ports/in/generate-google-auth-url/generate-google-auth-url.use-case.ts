import { Uri } from '../../../value-objects/uri';

export const GenerateGoogleAuthUrlUseCaseSymbol = Symbol('GenerateGoogleAuthUrlUseCase');

export interface IGenerateGoogleAuthUrlUseCase {
  generateAuthUrl(): Uri;
}
