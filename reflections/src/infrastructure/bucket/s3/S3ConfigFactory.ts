import { S3Config } from '@__feedback__/shared';
import config from '../../config';

export class S3ConfigFactory {
  static createConfig(): S3Config {
    return {
      accessKeyId: config.get('s3.accessKeyId'),
      secretAccessKey: config.get('s3.secretAccessKey')
    };
  }
}
