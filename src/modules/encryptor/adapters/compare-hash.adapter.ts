import { ICompareHashPort } from '../../../domains/ports/out/compare-hash.port';
import { Inject } from '@nestjs/common';
import { HashServiceSymbol, IHashService } from '../services/definitions/hash.service';

export class CompareHashAdapter implements ICompareHashPort {
  constructor(@Inject(HashServiceSymbol)
              private readonly hashService: IHashService) {
  }

  compareHash(data: any, dataHash: string): Promise<boolean> {
    return this.hashService.compare(data, dataHash);
  }
}
