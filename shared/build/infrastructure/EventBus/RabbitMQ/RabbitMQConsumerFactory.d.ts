import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';
export declare class RabbitMQConsumerFactory {
    private deserializer;
    private connection;
    private maxRetries;
    constructor(deserializer: DomainEventDeserializer, connection: RabbitMQConnection, maxRetries: number);
    build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string): RabbitMQConsumer;
}
