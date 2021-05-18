export const GenerateJwtTokenPortSymbol = Symbol('IGenerateJwtTokenPort');

export interface IGenerateJwtTokenPort {
  generateJwtToken(id: string): string;
}
