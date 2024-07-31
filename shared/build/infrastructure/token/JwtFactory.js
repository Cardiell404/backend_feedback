"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtFactory = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class JwtFactory {
    constructor(config) {
        this.config = config;
    }
    createToken(payload) {
        return (0, jsonwebtoken_1.sign)(payload, this.config.encrypt, { expiresIn: '1h' });
    }
    ValidateJWT(token) {
        return (0, jsonwebtoken_1.verify)(token, this.config.encrypt);
    }
}
exports.JwtFactory = JwtFactory;
