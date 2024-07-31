"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFields = void 0;
const express_validator_1 = require("express-validator");
class ValidateFields {
    validateRequest(req) {
        const errors = (0, express_validator_1.validationResult)(req);
        return errors.array();
    }
}
exports.ValidateFields = ValidateFields;
