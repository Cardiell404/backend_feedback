"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const OrderBy_1 = require("./OrderBy");
const OrderType_1 = require("./OrderType");
class Order {
    constructor(orderBy, orderType) {
        this.orderBy = orderBy;
        this.orderType = orderType;
    }
    static fromValues(orderBy, orderType) {
        if (!orderBy) {
            return Order.none();
        }
        return new Order(new OrderBy_1.OrderBy(orderBy), OrderType_1.OrderType.fromValue(orderType || OrderType_1.OrderTypes.ASC));
    }
    static none() {
        return new Order(new OrderBy_1.OrderBy(''), new OrderType_1.OrderType(OrderType_1.OrderTypes.NONE));
    }
    static desc(orderBy) {
        return new Order(new OrderBy_1.OrderBy(orderBy), new OrderType_1.OrderType(OrderType_1.OrderTypes.DESC));
    }
    static asc(orderBy) {
        return new Order(new OrderBy_1.OrderBy(orderBy), new OrderType_1.OrderType(OrderType_1.OrderTypes.ASC));
    }
    hasOrder() {
        return !this.orderType.isNone();
    }
}
exports.Order = Order;
