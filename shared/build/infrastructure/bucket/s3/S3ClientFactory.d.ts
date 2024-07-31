import { S3 } from 'aws-sdk';
import { S3Config } from './S3Config';
export declare class S3ClientFactory {
    private static clients;
    static createClient(region: string, config: S3Config): S3;
    private static getClient;
    private static createAndConnectClient;
    private static registerClient;
}
