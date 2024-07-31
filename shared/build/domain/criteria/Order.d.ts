import { OrderBy } from './OrderBy';
import { OrderType } from './OrderType';
export declare class Order {
    readonly orderBy: OrderBy;
    readonly orderType: OrderType;
    constructor(orderBy: OrderBy, orderType: OrderType);
    static fromValues(orderBy?: string, orderType?: string): Order;
    static none(): Order;
    static desc(orderBy: string): Order;
    static asc(orderBy: string): Order;
    hasOrder(): boolean;
}
