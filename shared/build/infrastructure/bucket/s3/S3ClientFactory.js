"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ClientFactory = void 0;
const aws_sdk_1 = require("aws-sdk");
class S3ClientFactory {
    static createClient(region, config) {
        let client = S3ClientFactory.getClient(region);
        if (!client) {
            client = S3ClientFactory.createAndConnectClient(region, config);
            S3ClientFactory.registerClient(client, region);
        }
        return client;
    }
    static getClient(region) {
        return S3ClientFactory.clients[region];
    }
    static createAndConnectClient(region, config) {
        return new aws_sdk_1.S3({ region, credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey } });
    }
    static registerClient(client, region) {
        S3ClientFactory.clients[region] = client;
    }
}
exports.S3ClientFactory = S3ClientFactory;
S3ClientFactory.clients = {};
