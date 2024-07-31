"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOperator = exports.Operator = void 0;
const EnumValueObject_1 = require("../value-object/EnumValueObject");
const InvalidArgumentError_1 = require("../value-object/InvalidArgumentError");
var Operator;
(function (Operator) {
    Operator["EQUAL"] = "=";
    Operator["NOT_EQUAL"] = "!=";
    Operator["GT"] = ">";
    Operator["LT"] = "<";
    Operator["CONTAINS"] = "CONTAINS";
    Operator["NOT_CONTAINS"] = "NOT_CONTAINS";
})(Operator = exports.Operator || (exports.Operator = {}));
class FilterOperator extends EnumValueObject_1.EnumValueObject {
    constructor(value) {
        super(value, Object.values(Operator));
    }
    static fromValue(value) {
        switch (value) {
            case Operator.EQUAL:
                return new FilterOperator(Operator.EQUAL);
            case Operator.NOT_EQUAL:
                return new FilterOperator(Operator.NOT_EQUAL);
            case Operator.GT:
                return new FilterOperator(Operator.GT);
            case Operator.LT:
                return new FilterOperator(Operator.LT);
            case Operator.CONTAINS:
                return new FilterOperator(Operator.CONTAINS);
            case Operator.NOT_CONTAINS:
                return new FilterOperator(Operator.NOT_CONTAINS);
            default:
                throw new InvalidArgumentError_1.InvalidArgumentError(`The filter operator ${value} is invalid`);
        }
    }
    isPositive() {
        return this.value !== Operator.NOT_EQUAL && this.value !== Operator.NOT_CONTAINS;
    }
    throwErrorForInvalidValue(value) {
        throw new InvalidArgumentError_1.InvalidArgumentError(`The filter operator ${value} is invalid`);
    }
    static equal() {
        return this.fromValue(Operator.EQUAL);
    }
}
exports.FilterOperator = FilterOperator;
