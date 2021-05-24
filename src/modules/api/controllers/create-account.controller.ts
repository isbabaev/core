import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateAccountUseCaseSymbol,
  ICreateAccountUseCase,
} from '../../../domains/ports/in/create-account/create-account.use-case';
import { CreateAccountCommand } from '../../../domains/ports/in/create-account/create-account.command';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { CreateAccountDto, CreateAccountResultDto } from '../dto/create-account.dto';

@Controller('create-account')
export class CreateAccountController {
  constructor(@Inject(CreateAccountUseCaseSymbol)
              private readonly createAccountUseCase: ICreateAccountUseCase) {
  }

  @Post()
  async createAccount(@Body() createAccountData: CreateAccountDto): Promise<CreateAccountResultDto> {
    const { firstName, lastName, email, password } = createAccountData;
    const createAccountResult = await this.createAccountUseCase.createAccount(
      new CreateAccountCommand(
        new AccountFirstName(firstName),
        new AccountLastName(lastName),
        new AccountEmail(email),
        password,
      ),
    );
    return { id: createAccountResult.id.value };
  }
}
