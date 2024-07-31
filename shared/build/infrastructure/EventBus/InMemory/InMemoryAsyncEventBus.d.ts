/// <reference types="node" />
import { EventEmitter } from 'events';
import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/EventBus';
import { DomainEventSubscribers } from '../DomainEventSubscribers';
export declare class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
    publish(events: DomainEvent[]): Promise<void>;
    addSubscribers(subscribers: DomainEventSubscribers): void;
}
