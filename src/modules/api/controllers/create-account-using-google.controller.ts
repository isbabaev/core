import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { CreateAccountUsingGoogleDto, CreateAccountUsingGoogleResultDto } from '../dto/create-account-using-google.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CreateAccountUsingGoogleUseCaseSymbol } from '../../../domains/ports/in/create-account-using-google/create-account-using-google.use-case';
import { CreateAccountUsingGoogleService } from '../../../domains/services/create-account-using-google.service';
import { CreateAccountUsingGoogleCommand } from '../../../domains/ports/in/create-account-using-google/create-account-using-google.command';

@Controller('create-account-using-google')
export class CreateAccountUsingGoogleController {
  constructor(@Inject(CreateAccountUsingGoogleUseCaseSymbol)
              private readonly createAccountUsingGoogleService: CreateAccountUsingGoogleService) {
  }

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: CreateAccountUsingGoogleDto })
  async createAccountUsingGoogle(@Body() createAccountData: CreateAccountUsingGoogleDto)
    : Promise<CreateAccountUsingGoogleResultDto> {
    const createAccountResult = await this.createAccountUsingGoogleService.createAccount(
      new CreateAccountUsingGoogleCommand(createAccountData.code)
    );
    return { id: createAccountResult.id.value };
  }
}
