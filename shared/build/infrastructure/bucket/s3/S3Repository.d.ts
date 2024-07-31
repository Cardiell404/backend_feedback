import { S3 } from "aws-sdk";
export declare abstract class S3Repository {
    private _client;
    constructor(_client: S3);
    protected abstract bucketName: string;
    protected client(): S3;
    protected upload(image: string, key: string): Promise<string>;
    protected getObject(key: string): Promise<string | undefined>;
}
