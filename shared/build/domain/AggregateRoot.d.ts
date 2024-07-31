import { DomainEvent } from './DomainEvent';
export declare abstract class AggregateRoot {
    private domainEvents;
    constructor();
    pullDomainEvents(): Array<DomainEvent>;
    record(event: DomainEvent): void;
    abstract toPrimitives(): any;
}
