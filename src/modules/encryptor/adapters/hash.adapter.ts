import { IHashPort } from '../../../domains/ports/out/encryptor/hash/hash.port';
import { IHashService } from '../services/definitions/hash.service';

export class HashAdapter implements IHashPort {
  constructor(private readonly hashService: IHashService) {
  }

  hash(data: any): Promise<string> {
    return this.hashService.hash(data);
  }
}
