import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateAccountUseCaseSymbol,
  ICreateAccountUseCase,
} from '../../../domains/ports/in/create-account/create-account.use-case';
import { CreateAccountCommand } from '../../../domains/ports/in/create-account/create-account.command';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { ICreateAccountResult } from '../../../domains/ports/in/create-account/create-account.result';
import { CreateAccountDto } from '../dto/create-account.dto';

@Controller('create-account')
export class CreateAccountController {
  constructor(@Inject(CreateAccountUseCaseSymbol)
              private readonly createAccountUseCase: ICreateAccountUseCase) {
  }

  @Post()
  createAccount(@Body() createAccountData: CreateAccountDto): Promise<ICreateAccountResult> {
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
