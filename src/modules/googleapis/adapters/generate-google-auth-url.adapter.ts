import { IGenerateGoogleAuthUrlPort } from '../../../domains/ports/out/googleapis/generate-google-auth-url.port';
import { Uri } from '../../../domains/value-objects/uri';
import { GenerateAuthUrlService } from '../services/generate-auth-url.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateGoogleAuthUrlAdapter implements IGenerateGoogleAuthUrlPort {
  constructor(private readonly generateAuthUrlService: GenerateAuthUrlService) {
  }

  generateGoogleAuthPort(): Uri {
    const url = this.generateAuthUrlService.generateAuthUrl();
    return new Uri(url);
  }
}
