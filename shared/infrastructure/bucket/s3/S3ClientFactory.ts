import { S3 } from 'aws-sdk';
import { Nullable } from '../../../domain/Nullable';
import { S3Config } from './S3Config';

export class S3ClientFactory {
  private static clients: { [key: string]: S3 } = {};

  static createClient(region: string, config: S3Config): S3 {
    let client = S3ClientFactory.getClient(region);
    if (!client) {
      client = S3ClientFactory.createAndConnectClient(region, config);

      S3ClientFactory.registerClient(client, region);
    }

    return client;
  }

  private static getClient(region: string): Nullable<S3> {
    return S3ClientFactory.clients[region];
  }

  private static createAndConnectClient(region: string, config: S3Config): S3 {
    return new S3({region, credentials: {accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey} });
  }

  private static registerClient(client: S3, region: string): void {
    S3ClientFactory.clients[region] = client;
  }
}
