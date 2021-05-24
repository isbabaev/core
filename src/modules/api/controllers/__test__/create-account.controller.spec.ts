import { ICreateAccountUseCase } from '../../../../domains/ports/in/create-account/create-account.use-case';
import { anything, capture, instance, mock, when } from 'ts-mockito';
import { CreateAccountDto } from '../../dto/create-account.dto';
import { CreateAccountController } from '../create-account.controller';
import { Id } from '../../../../domains/value-objects/id';

describe('CreateAccountControllerTest', () => {
  let createAccountController: CreateAccountController;
  let createAccountUseCase: ICreateAccountUseCase;
  let createAccountData: CreateAccountDto;

  beforeAll(() => {
    createAccountUseCase = mock<ICreateAccountUseCase>();
    createAccountController = new CreateAccountController(instance(createAccountUseCase));

    createAccountData = new CreateAccountDto(
      'Test',
      'Test',
      'test@mail.com',
      'password'
    );
  });

  test('should call method createAccount of createAccountUseCase', async() => {
    await createAccountController.createAccount(createAccountData);

    const createAccountArguments = capture(createAccountUseCase.createAccount).first();
    expect(createAccountArguments[0].firstName.value).toBe(createAccountData.firstName);
    expect(createAccountArguments[0].lastName.value).toBe(createAccountData.lastName);
    expect(createAccountArguments[0].email.value).toBe(createAccountData.email);
    expect(createAccountArguments[0].password).toBe(createAccountData.password);
  });

  test('should return id', async () => {
    const mockedId = new Id('fbb3fb5f-6d83-456d-b2ba-198db719641a');
    when(createAccountUseCase.createAccount(anything())).thenResolve({id: mockedId});

    const createAccountResult = await createAccountController.createAccount(createAccountData);

    expect(createAccountResult.id).toBe(mockedId.value);
  });
});
