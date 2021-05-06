export const GenerateJwtTokenPortSymbol = Symbol('GenerateJwtTokenPort');

export interface GenerateJwtTokenPort {
  generateJwtToken(email: string): string;
}
