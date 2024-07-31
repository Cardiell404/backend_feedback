import { DomainEventClass } from '../../domain/DomainEvent';
import { DomainEventSubscribers } from './DomainEventSubscribers';
export declare class DomainEventDeserializer extends Map<string, DomainEventClass> {
    static configure(subscribers: DomainEventSubscribers): DomainEventDeserializer;
    private registerEvent;
    deserialize(event: string): import("../../domain/DomainEvent").DomainEvent;
}
