import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAccountUseCase, CreateAccountUseCaseSymbol } from '../../../domains/ports/in/create-account/create-account.use-case';
import { CreateAccountDto } from '../dto/account.dto';

@Controller('account')
export class AccountController {
  constructor(@Inject(CreateAccountUseCaseSymbol)
              private readonly createAccountUseCase: CreateAccountUseCase) {
  }

  @Post()
  createAccount(@Body() createAccountData: CreateAccountDto): Promise<any> {
    return this.createAccountUseCase.createAccount(createAccountData);
  }
}
