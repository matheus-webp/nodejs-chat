import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor() {}

  async encrypt(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
