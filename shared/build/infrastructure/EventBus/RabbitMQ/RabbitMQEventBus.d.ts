import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventFailoverPublisher } from '../DomainEventFailoverPublisher/DomainEventFailoverPublisher';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
export declare class RabbitMQEventBus implements EventBus {
    private failoverPublisher;
    private connection;
    private exchange;
    private queueNameFormatter;
    private maxRetries;
    constructor(params: {
        failoverPublisher: DomainEventFailoverPublisher;
        connection: RabbitMQConnection;
        exchange: string;
        queueNameFormatter: RabbitMQqueueFormatter;
        maxRetries: number;
    });
    addSubscribers(subscribers: DomainEventSubscribers): Promise<void>;
    publish(events: Array<DomainEvent>): Promise<void>;
    private options;
    private toBuffer;
}
