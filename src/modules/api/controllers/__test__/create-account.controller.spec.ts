import { ICreateAccountUseCase } from '../../../../domains/ports/in/create-account/create-account.use-case';
import { capture, instance, mock } from 'ts-mockito';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { CreateAccountController } from '../create-account.controller';

describe('CreateAccountControllerTest', () => {
  let createAccountController: CreateAccountController;
  let createAccountUseCase: ICreateAccountUseCase;

  beforeAll(() => {
    createAccountUseCase = mock<ICreateAccountUseCase>();
    createAccountController = new CreateAccountController(instance(createAccountUseCase));
  });

  test('should call method createAccount of createAccountUseCase', async() => {
    const createAccountData: CreateAccountDto = new CreateAccountDto(
      'Test',
      'Test',
      'test@mail.com',
      'password'
    );

    await createAccountController.createAccount(createAccountData);

    const createAccountArguments = capture(createAccountUseCase.createAccount).first();
    expect(createAccountArguments[0].firstName.value).toBe(createAccountData.firstName);
    expect(createAccountArguments[0].lastName.value).toBe(createAccountData.lastName);
    expect(createAccountArguments[0].email.value).toBe(createAccountData.email);
    expect(createAccountArguments[0].password).toBe(createAccountData.password);
  });
});
