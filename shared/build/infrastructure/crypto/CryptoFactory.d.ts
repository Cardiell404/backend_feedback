import { CryptoImplement } from '../../domain/CryptoImplement';
export declare class CryptoFactory implements CryptoImplement {
    constructor();
    encryptPassword(message: string): string;
}
