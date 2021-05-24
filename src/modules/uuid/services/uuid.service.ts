import {v4 as uuidv4} from 'uuid';

export class UuidService {
  generate(): string {
    return uuidv4();
  }
}
