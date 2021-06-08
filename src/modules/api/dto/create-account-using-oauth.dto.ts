import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountUsingOAuthDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export class CreateAccountUsingOAuthResultDto {
  @ApiProperty()
  id: string;
}
