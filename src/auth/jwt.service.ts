import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JWTService {
  constructor() {}

  async generate(payload: string) {
    return await jwt.sign(payload, process.env.JWT_SECRET);
  }

  async verify(token: string) {
    return await jwt.verify(token, process.env.JWT_SECRET);
  }
}
