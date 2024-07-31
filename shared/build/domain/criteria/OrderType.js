"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = exports.OrderTypes = void 0;
const EnumValueObject_1 = require("../value-object/EnumValueObject");
const InvalidArgumentError_1 = require("../value-object/InvalidArgumentError");
var OrderTypes;
(function (OrderTypes) {
    OrderTypes["ASC"] = "asc";
    OrderTypes["DESC"] = "desc";
    OrderTypes["NONE"] = "none";
})(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));
class OrderType extends EnumValueObject_1.EnumValueObject {
    constructor(value) {
        super(value, Object.values(OrderTypes));
    }
    static fromValue(value) {
        switch (value) {
            case OrderTypes.ASC:
                return new OrderType(OrderTypes.ASC);
            case OrderTypes.DESC:
                return new OrderType(OrderTypes.DESC);
            default:
                throw new InvalidArgumentError_1.InvalidArgumentError(`The order type ${value} is invalid`);
        }
    }
    isNone() {
        return this.value === OrderTypes.NONE;
    }
    isAsc() {
        return this.value === OrderTypes.ASC;
    }
    throwErrorForInvalidValue(value) {
        throw new InvalidArgumentError_1.InvalidArgumentError(`The order type ${value} is invalid`);
    }
}
exports.OrderType = OrderType;
