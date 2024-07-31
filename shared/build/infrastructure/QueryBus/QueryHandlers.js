"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const QueryNotRegisteredError_1 = require("../../domain/QueryNotRegisteredError");
class QueryHandlers extends Map {
    constructor(queryHandlers) {
        super();
        queryHandlers.forEach(queryHandler => {
            this.set(queryHandler.subscribedTo(), queryHandler);
        });
    }
    get(query) {
        const queryHandler = super.get(query.constructor);
        if (!queryHandler) {
            throw new QueryNotRegisteredError_1.QueryNotRegisteredError(query);
        }
        return queryHandler;
    }
}
exports.QueryHandlers = QueryHandlers;
