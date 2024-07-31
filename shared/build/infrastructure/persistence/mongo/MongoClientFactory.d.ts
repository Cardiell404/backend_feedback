import { MongoClient } from 'mongodb';
import { MongoConfig } from './MongoConfig';
export declare class MongoClientFactory {
    private static clients;
    static createClient(contextName: string, config: MongoConfig): Promise<MongoClient>;
    private static getClient;
    private static createAndConnectClient;
    private static registerClient;
}
