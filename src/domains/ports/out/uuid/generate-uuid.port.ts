export const GenerateUuidPortSymbol = Symbol('IGenerateUuidPort');

export interface IGenerateUuidPort {
  generateUuid(): string;
}
