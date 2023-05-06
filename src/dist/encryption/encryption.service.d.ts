export declare class EncryptionService {
    constructor();
    encrypt(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
