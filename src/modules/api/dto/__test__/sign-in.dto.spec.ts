import { validate } from 'class-validator';
import { SignInDto } from '../sign-in.dto';

describe('SignInDtoTest', () => {
  test('validate should not return any errors', async () => {
    const signInData = new SignInDto('test@mail.com', 'password');

    const errors = await validate(signInData);

    expect(errors.length).toBe(0);
  });

  test('validate should return error when email is not a string', async () => {
    const signInData = new SignInDto({} as any, 'password');

    const errors = await validate(signInData);

    expect(errors.length).toBe(1);
  });

  test('validate should return error when password is not a string', async () => {
    const signInData = new SignInDto('test@mail.com', {} as any);

    const errors = await validate(signInData);

    expect(errors.length).toBe(1);
  });
});
