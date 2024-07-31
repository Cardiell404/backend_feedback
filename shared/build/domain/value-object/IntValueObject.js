"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberValueObject = void 0;
const ValueObject_1 = require("./ValueObject");
class NumberValueObject extends ValueObject_1.ValueObject {
    isBiggerThan(other) {
        return this.value > other.value;
    }
}
exports.NumberValueObject = NumberValueObject;
