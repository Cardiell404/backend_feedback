import { Collection, MongoClient } from 'mongodb';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Criteria } from '../../../domain/criteria/Criteria';
import { Filters, Nullable } from '../../../domain';
export declare abstract class MongoRepository<T extends AggregateRoot> {
    private _client;
    private criteriaConverter;
    constructor(_client: Promise<MongoClient>);
    protected abstract moduleName(): string;
    protected client(): Promise<MongoClient>;
    protected collection(): Promise<Collection>;
    protected searchAllByCriteria<D>(criteria: Criteria): Promise<D[]>;
    protected searchByCriteria<D>(filters: Filters): Promise<Nullable<D>>;
    protected persist(id: string, aggregateRoot: T): Promise<void>;
}
