import { AccountFirstName } from '../../../../value-objects/account/account-first-name';
import { AccountLastName } from '../../../../value-objects/account/account-last-name';
import { AccountEmail } from '../../../../value-objects/account/account-email';

export interface ILoadGoogleAccountInfoByCodeResult {
  firstName: AccountFirstName;
  lastName: AccountLastName;
  email: AccountEmail;
}
