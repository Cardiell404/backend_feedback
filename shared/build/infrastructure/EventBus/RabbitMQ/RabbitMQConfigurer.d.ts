import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQqueueFormatter } from './RabbitMQqueueFormatter';
export declare class RabbitMQConfigurer {
    private connection;
    private queueNameFormatter;
    private messageRetryTtl;
    constructor(connection: RabbitMQConnection, queueNameFormatter: RabbitMQqueueFormatter, messageRetryTtl: number);
    configure(params: {
        exchange: string;
        subscribers: Array<DomainEventSubscriber<DomainEvent>>;
    }): Promise<void>;
    private addQueue;
    private getRoutingKeysFor;
}
