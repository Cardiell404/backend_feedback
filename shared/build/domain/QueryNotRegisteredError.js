"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryNotRegisteredError = void 0;
class QueryNotRegisteredError extends Error {
    constructor(query) {
        super(`The query <${query.constructor.name}> hasn't a query handler associated`);
    }
}
exports.QueryNotRegisteredError = QueryNotRegisteredError;
