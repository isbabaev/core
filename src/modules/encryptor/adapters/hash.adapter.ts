import { Inject } from '@nestjs/common';
import { HashPort } from '../../../domains/ports/out/hash.port';
import { HashServiceSymbol, IHashService } from '../services/definitions/hash.service';

export class HashAdapter implements HashPort {
  constructor(@Inject(HashServiceSymbol)
              private readonly hashService: IHashService) {
  }

  hash(data: any): Promise<string> {
    return this.hashService.hash(data);
  }
}
