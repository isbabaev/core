export const IAuthServiceSymbol = Symbol('IAuthService');

export interface IAuthService {
  generateJwtToken(payload: any): string;
}
