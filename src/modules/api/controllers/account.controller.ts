import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ICreateAccountUseCase,
  CreateAccountUseCaseSymbol,
} from '../../../domains/ports/in/create-account/create-account.use-case';
import { CreateAccountDto } from '../dto/account.dto';
import { CreateAccountCommand } from '../../../domains/ports/in/create-account/create-account.command';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';

@Controller('account')
export class AccountController {
  constructor(@Inject(CreateAccountUseCaseSymbol)
              private readonly createAccountUseCase: ICreateAccountUseCase) {
  }

  @Post()
  createAccount(@Body() createAccountData: CreateAccountDto): Promise<any> {
    const { firstName, lastName, email, password } = createAccountData;
    return this.createAccountUseCase.createAccount(
      new CreateAccountCommand(
        new AccountFirstName(firstName),
        new AccountLastName(lastName),
        new AccountEmail(email),
        password,
      ),
    );
  }
}
