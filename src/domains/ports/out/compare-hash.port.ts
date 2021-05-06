export const ICompareHashPortSymbol = Symbol('ICompareHashPort');

export interface ICompareHashPort {
  compareHash(data: any, dataHash: string): Promise<boolean>;
}
