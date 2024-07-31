/// <reference types="node" />
import amqplib, { ConsumeMessage } from 'amqplib';
import { ConnectionSettings } from './ConnectionSettings';
export declare class RabbitMQConnection {
    private connectionSettings;
    private channel?;
    private connection?;
    constructor(params: {
        connectionSettings: ConnectionSettings;
    });
    connect(): Promise<void>;
    exchange(params: {
        name: string;
    }): Promise<amqplib.Replies.AssertExchange | undefined>;
    queue(params: {
        exchange: string;
        name: string;
        routingKeys: string[];
        deadLetterExchange?: string;
        deadLetterQueue?: string;
        messageTtl?: number;
    }): Promise<void>;
    private getQueueArguments;
    deleteQueue(queue: string): Promise<amqplib.Replies.DeleteQueue>;
    private amqpConnect;
    private amqpChannel;
    publish(params: {
        exchange: string;
        routingKey: string;
        content: Buffer;
        options: {
            messageId: string;
            contentType: string;
            contentEncoding: string;
            priority?: number;
            headers?: any;
        };
    }): Promise<unknown>;
    close(): Promise<void | undefined>;
    consume(queue: string, onMessage: (message: ConsumeMessage) => {}): Promise<void>;
    ack(message: ConsumeMessage): void;
    retry(message: ConsumeMessage, queue: string, exchange: string): Promise<unknown>;
    deadLetter(message: ConsumeMessage, queue: string, exchange: string): Promise<unknown>;
    private getMessageOptions;
    private incrementRedeliveryCount;
    private hasBeenRedelivered;
}
