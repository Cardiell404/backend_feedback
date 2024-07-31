import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';
export declare class RabbitMQqueueFormatter {
    private moduleName;
    constructor(moduleName: string);
    format(subscriber: DomainEventSubscriber<DomainEvent>): string;
    formatRetry(subscriber: DomainEventSubscriber<DomainEvent>): string;
    formatDeadLetter(subscriber: DomainEventSubscriber<DomainEvent>): string;
}
