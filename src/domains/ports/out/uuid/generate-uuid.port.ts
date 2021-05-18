export const GenerateUuidPortSymbol = Symbol('IGenerateUuidPort');

export interface IGenerateUuidPort {
  uuidv4(): string;
}
