"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const InvalidArgumentError_1 = require("./InvalidArgumentError");
class ValueObject {
    constructor(value) {
        this.value = value;
        this.ensureValueIsDefined(value);
    }
    ensureValueIsDefined(value) {
        if (value === null || value === undefined) {
            throw new InvalidArgumentError_1.InvalidArgumentError('Value must be defined');
        }
    }
    equals(other) {
        return other.constructor.name === this.constructor.name && other.value === this.value;
    }
    toString() {
        return this.value.toString();
    }
}
exports.ValueObject = ValueObject;
