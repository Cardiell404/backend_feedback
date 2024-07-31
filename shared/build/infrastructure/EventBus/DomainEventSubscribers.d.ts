import { ContainerBuilder } from 'node-dependency-injection';
import { DomainEvent } from '../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';
export declare class DomainEventSubscribers {
    items: Array<DomainEventSubscriber<DomainEvent>>;
    constructor(items: Array<DomainEventSubscriber<DomainEvent>>);
    static from(container: ContainerBuilder): DomainEventSubscribers;
}
