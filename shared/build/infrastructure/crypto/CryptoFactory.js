"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoFactory = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
class CryptoFactory {
    constructor() {
    }
    encryptPassword(message) {
        return crypto_js_1.default.SHA512(message).toString();
    }
}
exports.CryptoFactory = CryptoFactory;
