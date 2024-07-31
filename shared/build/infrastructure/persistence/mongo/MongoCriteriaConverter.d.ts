import { Criteria } from '../../../domain/criteria/Criteria';
import { Filters } from '../../../domain/criteria/Filters';
import { Order } from '../../../domain/criteria/Order';
type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex';
type MongoFilterValue = boolean | string | number;
type MongoFilterOperation = {
    [operator in MongoFilterOperator]?: MongoFilterValue;
};
type MongoFilter = {
    [field: string]: MongoFilterOperation;
} | {
    [field: string]: {
        $not: MongoFilterOperation;
    };
};
type MongoDirection = 1 | -1;
type MongoSort = {
    [field: string]: MongoDirection;
};
interface MongoQuery {
    filter: MongoFilter;
    sort: MongoSort;
    skip: number;
    limit: number;
}
export declare class MongoCriteriaConverter {
    private filterTransformers;
    constructor();
    convert(criteria: Criteria): MongoQuery;
    getFilters(filters: Filters): MongoFilter;
    protected generateFilter(filters: Filters): MongoFilter;
    protected generateSort(order: Order): MongoSort;
    private equalFilter;
    private notEqualFilter;
    private greaterThanFilter;
    private lowerThanFilter;
    private containsFilter;
    private notContainsFilter;
}
export {};
