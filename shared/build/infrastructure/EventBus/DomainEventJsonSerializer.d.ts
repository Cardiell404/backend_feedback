import { DomainEvent } from '../../domain/DomainEvent';
export declare class DomainEventJsonSerializer {
    static serialize(event: DomainEvent): string;
}
