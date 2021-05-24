import { IGenerateUuidPort } from '../../../domains/ports/out/uuid/generate-uuid.port';
import { UuidService } from '../services/uuid.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateUuidAdapter implements IGenerateUuidPort {
  constructor(private readonly uuidService: UuidService) {
  }

  generateUuid(): string {
    return this.uuidService.generate();
  }
}
