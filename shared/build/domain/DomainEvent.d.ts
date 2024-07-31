export declare abstract class DomainEvent {
    static EVENT_NAME: string;
    static fromPrimitives: (params: {
        aggregateId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }) => DomainEvent;
    readonly aggregateId: string;
    readonly eventId: string;
    readonly occurredOn: Date;
    readonly eventName: string;
    constructor(params: {
        eventName: string;
        aggregateId: string;
        eventId?: string;
        occurredOn?: Date;
    });
    abstract toPrimitives(): DomainEventAttributes;
}
export type DomainEventClass = {
    EVENT_NAME: string;
    fromPrimitives(params: {
        aggregateId: string;
        eventId: string;
        occurredOn: Date;
        attributes: DomainEventAttributes;
    }): DomainEvent;
};
type DomainEventAttributes = any;
export {};
