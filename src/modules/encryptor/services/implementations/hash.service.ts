import { IHashService } from '../definitions/hash.service';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService implements IHashService {
  async hash(data: any): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  compare(data: any, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
