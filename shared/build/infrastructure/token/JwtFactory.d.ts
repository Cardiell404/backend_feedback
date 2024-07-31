import { JwtImplement, JwtPayload } from './../../domain/JwtImplement';
import { JwtConfig } from './JwtConfig';
export declare class JwtFactory implements JwtImplement {
    private config;
    constructor(config: JwtConfig);
    createToken(payload: any): string;
    ValidateJWT(token: string): JwtPayload;
}
