import { HashPort } from '../../../domains/ports/out/hash.port';
import { IHashService } from '../services/definitions/hash.service';

export class HashAdapter implements HashPort {
  constructor(private readonly hashService: IHashService) {
  }

  hash(data: any): Promise<string> {
    return this.hashService.hash(data);
  }
}
