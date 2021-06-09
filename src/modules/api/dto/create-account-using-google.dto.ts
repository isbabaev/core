import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountUsingGoogleDto {
  @ApiProperty()
  @IsString()
  code: string;
}

export class CreateAccountUsingGoogleResultDto {
  @ApiProperty()
  id: string;
}
