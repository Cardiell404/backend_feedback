import { Query } from '../../domain/Query';
import { QueryHandler } from '../../domain/QueryHandler';
import { Response } from '../../domain/Response';
export declare class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
    constructor(queryHandlers: Array<QueryHandler<Query, Response>>);
    get(query: Query): QueryHandler<Query, Response>;
}
