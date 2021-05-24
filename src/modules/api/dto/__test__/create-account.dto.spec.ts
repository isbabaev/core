import { validate } from 'class-validator';
import { CreateAccountDto } from '../create-account.dto';

describe('CreateAccountDtoTest', () => {
  test('validate should not return any errors', async () => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      'Test',
      'Test',
      'test@mail.com',
      'password',
    );

    const errors = await validate(createAccountData);

    expect(errors.length).toBe(0);
  });

  test('validate should return error when firstName is not a string', async () => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      {} as any,
      'Test',
      'test@mail.com',
      'password',
    );

    const errors = await validate(createAccountData);

    expect(errors.length).toBe(1);
  });

  test('validate should return error when lastName is not a string', async () => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      'Test',
      {} as any,
      'test@mail.com',
      'password',
    );

    const errors = await validate(createAccountData);

    expect(errors.length).toBe(1);
  });

  test('validate should return error when email is not a string', async () => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      'Test',
      'Test',
      {} as any,
      'password',
    );

    const errors = await validate(createAccountData);

    expect(errors.length).toBe(1);
  });

  test('validate should return error when password is not a string', async () => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      'Test',
      'Test',
      'test@mail.com',
      {} as any,
    );

    const errors = await validate(createAccountData);

    expect(errors.length).toBe(1);
  });
});
