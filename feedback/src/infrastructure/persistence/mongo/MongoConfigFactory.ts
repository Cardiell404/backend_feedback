import { MongoConfig } from '@__feedback__/shared';
import config from '../../config';

export class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: config.get('mongo.url')
    };
  }
}
