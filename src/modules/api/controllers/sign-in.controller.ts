import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISignInUseCase, SignInUseCaseSymbol } from '../../../domains/ports/in/sign-in/sign-in.use-case';
import { SignInDto } from '../dto/sign-in.dto';
import { ISignInResult } from '../../../domains/ports/in/sign-in/sign-in.result';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { SignInCommand } from '../../../domains/ports/in/sign-in/sign-in.command';

@Controller('sign-in')
export class SignInController {
  constructor(@Inject(SignInUseCaseSymbol)
              private readonly signInUseCase: ISignInUseCase) {
  }

  @Post()
  signIn(@Body() signInData: SignInDto): Promise<ISignInResult> {
    const { email, password } = signInData;
    return this.signInUseCase.signIn(
      new SignInCommand(
        new AccountEmail(email),
        password,
      ),
    );
  }
}
