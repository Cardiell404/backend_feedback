import { Query } from '../../domain/Query';
import { Response } from '../../domain/Response';
import { QueryBus } from './../../domain/QueryBus';
import { QueryHandlers } from './QueryHandlers';
export declare class InMemoryQueryBus implements QueryBus {
    private queryHandlersInformation;
    constructor(queryHandlersInformation: QueryHandlers);
    ask<R extends Response>(query: Query): Promise<R>;
}
