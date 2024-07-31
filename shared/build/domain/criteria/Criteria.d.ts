import { Filters } from './Filters';
import { Order } from './Order';
export declare class Criteria {
    readonly filters: Filters;
    readonly order: Order;
    readonly limit?: number;
    readonly offset?: number;
    constructor(filters: Filters, order: Order, limit?: number, offset?: number);
    hasFilters(): boolean;
}
