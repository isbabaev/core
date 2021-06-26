import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import {
  CreateAccountUseCaseSymbol,
  ICreateAccountUseCase,
} from '../../../domains/ports/in/create-account/create-account.use-case';
import { CreateAccountCommand } from '../../../domains/ports/in/create-account/create-account.command';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { CreateAccountDto, CreateAccountResultDto } from '../dto/create-account.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('accounts')
export class AccountController {
  constructor(@Inject(CreateAccountUseCaseSymbol)
              private readonly createAccountUseCase: ICreateAccountUseCase) {
  }

  @Post()
  @ApiResponse({status: HttpStatus.CREATED, type: CreateAccountResultDto})
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
