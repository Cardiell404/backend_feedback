import config from '../../config';
import { MongoConfig } from '@__feedback__/shared';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
