import { IGenerateJwtTokenPort } from '../../../domains/ports/out/auth/generate-jwt-token.port';
import { IAuthService } from '../services/definitions/auth.service';
import { Id } from '../../../domains/value-objects/id';

export class GenerateJwtTokenAdapter implements IGenerateJwtTokenPort {
  constructor(private readonly authService: IAuthService) {
  }

  generateJwtToken(id: Id): string {
    return this.authService.generateJwtToken({value: id.value});
  }
}
