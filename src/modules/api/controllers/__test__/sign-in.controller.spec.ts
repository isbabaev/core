import { ISignInUseCase } from '../../../../domains/ports/in/sign-in/sign-in.use-case';
import { capture, instance, mock } from 'ts-mockito';
import { SignInDto } from '../../dto/sign-in.dto';
import { SignInController } from '../sign-in.controller';

describe('SignInControllerTest', () => {
  let signInController: SignInController;
  let signInUseCase: ISignInUseCase;

  beforeAll(() => {
    signInUseCase = mock<ISignInUseCase>();
    signInController = new SignInController(instance(signInUseCase));
  });

  test('should call method signIn of signInUseCase', async () => {
    const signInData = new SignInDto('test@mail.com', 'password');

    await signInController.signIn(signInData);

    const signInArguments = capture(signInUseCase.signIn).first();
    expect(signInArguments[0].email.value).toBe(signInData.email);
    expect(signInArguments[0].password).toBe(signInData.password);
  });
});
