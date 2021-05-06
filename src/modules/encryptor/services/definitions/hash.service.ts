export const HashServiceSymbol = Symbol('IHashService');

export interface IHashService {
  hash(data: any): Promise<string>;
  compare(data: any, encrypted: string): Promise<boolean>;
}
