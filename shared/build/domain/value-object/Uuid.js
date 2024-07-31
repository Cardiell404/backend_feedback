"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
const uuid_validate_1 = __importDefault(require("uuid-validate"));
const InvalidArgumentError_1 = require("./InvalidArgumentError");
const ValueObject_1 = require("./ValueObject");
class Uuid extends ValueObject_1.ValueObject {
    constructor(value) {
        super(value);
        this.ensureIsValidUuid(value);
    }
    static random() {
        return new Uuid((0, uuid_1.v4)());
    }
    ensureIsValidUuid(id) {
        if (!(0, uuid_validate_1.default)(id)) {
            throw new InvalidArgumentError_1.InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }
}
exports.Uuid = Uuid;
