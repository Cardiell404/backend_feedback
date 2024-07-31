import { ConsumeMessage } from 'amqplib';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMQConnection } from './RabbitMQConnection';
export declare class RabbitMQConsumer {
    private subscriber;
    private deserializer;
    private connection;
    private maxRetries;
    private queueName;
    private exchange;
    constructor(params: {
        subscriber: DomainEventSubscriber<DomainEvent>;
        deserializer: DomainEventDeserializer;
        connection: RabbitMQConnection;
        queueName: string;
        exchange: string;
        maxRetries: number;
    });
    onMessage(message: ConsumeMessage): Promise<void>;
    private handleError;
    private retry;
    private deadLetter;
    private hasBeenRedeliveredTooMuch;
    private hasBeenRedelivered;
}
