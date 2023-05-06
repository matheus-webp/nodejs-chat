import * as jwt from 'jsonwebtoken';
export declare class JWTService {
    constructor();
    generate(payload: string): Promise<string>;
    verify(token: string): Promise<string | jwt.JwtPayload>;
}
