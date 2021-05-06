export const HashPortSymbol = Symbol('HashPort');

export interface HashPort {
  hash(data: any): Promise<string>;
}
