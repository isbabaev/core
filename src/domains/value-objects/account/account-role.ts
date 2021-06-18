import { BaseValueObject } from '../base-value-object';

type AccountRoleType = 'user' | 'admin';

export class AccountRole extends BaseValueObject<AccountRoleType> {
  constructor(value: AccountRoleType) {
    super(value);
  }

  isAdmin(): boolean {
    return this.value === 'admin';
  }
}
