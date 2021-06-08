import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { CreateAccountUsingOAuthUseCaseSymbol } from '../../../domains/ports/in/create-account-using-google/create-account-using-oauth.use-case';
import { CreateAccountUsingOAuthService } from '../../../domains/services/create-account-using-o-auth.service';
import { CreateAccountUsingOAuthDto, CreateAccountUsingOAuthResultDto } from '../dto/create-account-using-oauth.dto';
import { AccountFirstName } from '../../../domains/value-objects/account/account-first-name';
import { AccountLastName } from '../../../domains/value-objects/account/account-last-name';
import { AccountEmail } from '../../../domains/value-objects/account/account-email';
import { CreateAccountUsingOAuthCommand } from '../../../domains/ports/in/create-account-using-google/create-account-using-oauth.command';
import { ApiResponse } from '@nestjs/swagger';

@Controller('create-account-using-oauth')
export class CreateAccountUsingOAuthController {
  constructor(@Inject(CreateAccountUsingOAuthUseCaseSymbol)
              private readonly createAccountUsingOAuthService: CreateAccountUsingOAuthService) {
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateAccountUsingOAuthDto })
  async createAccountUsingOAuth(@Body() createAccountData: CreateAccountUsingOAuthDto)
    : Promise<CreateAccountUsingOAuthResultDto> {
    const { firstName, lastName, email } = createAccountData;
    const createAccountResult = await this.createAccountUsingOAuthService.createAccountUsingOAuth(
      new CreateAccountUsingOAuthCommand(
        new AccountFirstName(firstName),
        new AccountLastName(lastName),
        new AccountEmail(email),
      ),
    );
    return { id: createAccountResult.id.value };
  }
}
