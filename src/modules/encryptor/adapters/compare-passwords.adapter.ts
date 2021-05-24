import { Injectable } from '@nestjs/common';
import { IComparePasswordsPort } from '../../../domains/ports/out/encryptor/compare-passwords.port';
import { AccountPassword } from '../../../domains/value-objects/account/account-password';
import { HashService } from '../services/hash.service';

@Injectable()
export class ComparePasswordsAdapter implements IComparePasswordsPort {
  constructor(private readonly hashService: HashService) {
  }

  comparePasswords(password: string, hashedPassword: AccountPassword): Promise<boolean> {
    return this.hashService.compare(password, hashedPassword.value);
  }
}
