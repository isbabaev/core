import { IGenerateJwtTokenPort } from '../../../domains/ports/out/auth/generate-jwt-token.port';
import { IAuthService } from '../services/definitions/auth.service';

export class GenerateJwtTokenAdapter implements IGenerateJwtTokenPort {
  constructor(private readonly authService: IAuthService) {
  }

  generateJwtToken(email: string): string {
    return this.authService.generateJwtToken(email);
  }
}
