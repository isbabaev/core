import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '../definitions/auth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  generateJwtToken(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
