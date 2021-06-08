import { Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { GenerateGoogleAuthUrlUseCaseSymbol } from '../../../domains/ports/in/generate-google-auth-url/generate-google-auth-url.use-case';
import { GenerateGoogleAuthUrlService } from '../../../domains/services/generate-google-auth-url.service';
import { GenerateGoogleAuthUrlResultDto } from '../dto/generate-google-auth-url.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('generate-google-auth-url')
export class GenerateGoogleAuthUrlController {
  constructor(@Inject(GenerateGoogleAuthUrlUseCaseSymbol)
              private readonly generateGoogleAuthUrlService: GenerateGoogleAuthUrlService) {
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: GenerateGoogleAuthUrlResultDto })
  generateGoogleAuthUrl(): GenerateGoogleAuthUrlResultDto {
    const url = this.generateGoogleAuthUrlService.generateAuthUrl();
    return { url: url.value };
  }
}
