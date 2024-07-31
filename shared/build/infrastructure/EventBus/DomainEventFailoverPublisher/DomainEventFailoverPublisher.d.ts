import { Collection, MongoClient } from 'mongodb';
import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
export declare class DomainEventFailoverPublisher {
    private client;
    private deserializer?;
    static collectionName: string;
    constructor(client: Promise<MongoClient>, deserializer?: DomainEventDeserializer | undefined);
    protected collection(): Promise<Collection>;
    setDeserializer(deserializer: DomainEventDeserializer): void;
    publish(event: DomainEvent): Promise<void>;
    consume(): Promise<Array<DomainEvent>>;
}
