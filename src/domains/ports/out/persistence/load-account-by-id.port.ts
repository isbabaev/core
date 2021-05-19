import { Id } from '../../../value-objects/id';
import { Account } from '../../../entities/account';

export const LoadAccountByIdPortSymbol = Symbol('ILoadAccountByIdPort');

export interface ILoadAccountByIdPort {
  loadAccountById(id: Id): Promise<Account | null>;
}
