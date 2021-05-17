import { ICompareHashPort } from '../../../domains/ports/out/encryptor/compare-hash.port';
import { IHashService } from '../services/definitions/hash.service';

export class CompareHashAdapter implements ICompareHashPort {
  constructor(private readonly hashService: IHashService) {
  }

  compareHash(data: any, dataHash: string): Promise<boolean> {
    return this.hashService.compare(data, dataHash);
  }
}
