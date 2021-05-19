export const HashPasswordPortSymbol = Symbol('IHashPasswordPort');

export interface IHashPasswordPort {
  hash(password: string): Promise<string>;
}
