import { ILoadGoogleAccountInfoByCodeResult } from './load-google-account-info-by-code.result';

export const LoadGoogleAccountInfoByCodePortSymbol = Symbol('LoadGoogleAccountInfoByCodePort');

export interface ILoadGoogleAccountInfoByCodePort {
  loadAccountInfoByCode(code: string): Promise<ILoadGoogleAccountInfoByCodeResult>;
}
