import { IHashPasswordPort } from '../../../domains/ports/out/encryptor/hash-password.port';
import { Injectable } from '@nestjs/common';
import { HashService } from '../services/hash.service';

@Injectable()
export class HashPasswordAdapter implements IHashPasswordPort {
  constructor(private readonly hashService: HashService) {
  }

  hash(password: string): Promise<string> {
    return this.hashService.hash(password);
  }
}
