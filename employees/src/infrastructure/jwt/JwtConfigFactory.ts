import { JwtConfig } from '@__feedback__/shared';
import config from '../config';

export class JwtConfigFactory {
  static createConfig(): JwtConfig {
    return {
      encrypt: config.get('jwt.encrypt')
    };
  }
}
