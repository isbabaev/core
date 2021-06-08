import { ApiProperty } from '@nestjs/swagger';

export class GenerateGoogleAuthUrlResultDto {
  @ApiProperty()
  url: string;
}
