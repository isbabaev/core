import { AccountEntity } from '../account.entity';

describe('AccountEntityTest', () => {
  it('should create account', async () => {
    const firstName = 'Test';
    const lastName = 'Test';
    const email = 'test@mail.com';
    const password = 'passwd';

    const account = await AccountEntity.create(firstName, lastName, email, password);

    expect(account).toBeInstanceOf(AccountEntity);
  });

  it('should throw error, because email is not valid', async () => {
    const firstName = 'Test';
    const lastName = 'Test';
    const email = 'test@mail';
    const password = 'passwd';

    await expect(AccountEntity.create(firstName, lastName, email, password)).rejects.toThrowError();
  });
});
