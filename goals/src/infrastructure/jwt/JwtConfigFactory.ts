import config from '../config';
import { JwtConfig } from '@__feedback__/shared';

export class JwtConfigFactory {
  static createConfig(): JwtConfig {
    return {
      encrypt: config.get('jwt.encrypt')
    };
  }
}
