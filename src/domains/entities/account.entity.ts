import { validate } from 'class-validator';
import { Id } from '../value-objects/id';
import { AccountEmail } from '../value-objects/account/account-email';
import { AccountFirstName } from '../value-objects/account/account-first-name';
import { AccountLastName } from '../value-objects/account/account-last-name';
import { AccountPassword } from '../value-objects/account/account-password';
import { CreatedAt } from '../value-objects/created-at';
import { UpdatedAt } from '../value-objects/updated-at';

export class AccountEntity {
  private id: Id;
  private firstName: AccountFirstName;
  private lastName: AccountLastName;
  private email: AccountEmail;
  private password: AccountPassword;
  private createdAt: CreatedAt;
  private updatedAt: UpdatedAt;

  private constructor(firstName: AccountFirstName,
                      lastName: AccountLastName,
                      email: AccountEmail,
                      password: AccountPassword,
                      id?: Id,
                      createdAt?: CreatedAt,
                      updatedAt?: CreatedAt) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static async create(firstName: AccountFirstName,
                      lastName: AccountLastName,
                      email: AccountEmail,
                      password: AccountPassword,
                      id?: Id,
                      createdAt?: CreatedAt,
                      updatedAt?: CreatedAt): Promise<AccountEntity> {
    const account = new AccountEntity(firstName, lastName, email, password, id, createdAt, updatedAt);

    const validationErrors = await validate(account);
    if (validationErrors.length > 0) {
      throw Error();
    }

    return account;
  }
}
