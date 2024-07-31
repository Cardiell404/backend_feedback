"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidArgumentError = void 0;
const errors_1 = require("../errors");
class InvalidArgumentError extends errors_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, InvalidArgumentError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
