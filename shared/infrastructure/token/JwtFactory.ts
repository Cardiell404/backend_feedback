import { JwtImplement, JwtPayload } from './../../domain/JwtImplement';
import { sign, verify } from 'jsonwebtoken';
import { JwtConfig } from './JwtConfig';
export class JwtFactory implements JwtImplement {

  private config: JwtConfig;

  constructor(config: JwtConfig) {
    this.config = config;
  }

  createToken(payload: any): string {
    return sign(payload, this.config.encrypt, {expiresIn: '1h'});
  }

  ValidateJWT(token: string): JwtPayload { 
    return verify( token, this.config.encrypt ) as JwtPayload;
  }
}
