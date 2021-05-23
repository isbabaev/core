import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ISignInUseCase, SignInUseCaseSymbol } from '../../../domains/ports/in/sign-in/sign-in.use-case';
import { SignInDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(SignInUseCaseSymbol)
              private readonly signInUseCase: ISignInUseCase) {
  }

  @Post()
  signIn(@Body() signInData: SignInDto): Promise<string> {

  }
}
