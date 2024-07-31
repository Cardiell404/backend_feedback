"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const Filter_1 = require("./Filter");
class Filters {
    constructor(filters) {
        this.filters = filters;
    }
    static fromValues(filters) {
        return new Filters(filters.map(Filter_1.Filter.fromValues));
    }
    static none() {
        return new Filters([]);
    }
}
exports.Filters = Filters;
