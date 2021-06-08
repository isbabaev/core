import {
  IGenerateGoogleAuthUrlUseCase,
} from '../ports/in/generate-google-auth-url/generate-google-auth-url.use-case';
import { IGenerateGoogleAuthUrlPort } from '../ports/out/generate-google-auth-url/generate-google-auth-url.port';
import { Uri } from '../value-objects/uri';

export class GenerateGoogleAuthUrlService implements IGenerateGoogleAuthUrlUseCase {
  constructor(private readonly generateGoogleAuthUrlPort: IGenerateGoogleAuthUrlPort) {
  }

  generateAuthUrl(): Uri {
    return this.generateGoogleAuthUrlPort.generateGoogleAuthPort();
  }
}
