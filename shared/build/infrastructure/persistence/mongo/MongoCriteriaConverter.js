"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoCriteriaConverter = void 0;
const FilterOperator_1 = require("../../../domain/criteria/FilterOperator");
class MongoCriteriaConverter {
    constructor() {
        this.filterTransformers = new Map([
            [FilterOperator_1.Operator.EQUAL, this.equalFilter],
            [FilterOperator_1.Operator.NOT_EQUAL, this.notEqualFilter],
            [FilterOperator_1.Operator.GT, this.greaterThanFilter],
            [FilterOperator_1.Operator.LT, this.lowerThanFilter],
            [FilterOperator_1.Operator.CONTAINS, this.containsFilter],
            [FilterOperator_1.Operator.NOT_CONTAINS, this.notContainsFilter]
        ]);
    }
    convert(criteria) {
        return {
            filter: criteria.hasFilters() ? this.generateFilter(criteria.filters) : {},
            sort: criteria.order.hasOrder() ? this.generateSort(criteria.order) : { _id: -1 },
            skip: criteria.offset || 0,
            limit: criteria.limit || 0
        };
    }
    getFilters(filters) {
        return (filters.filters.length > 0) ? this.generateFilter(filters) : {};
    }
    generateFilter(filters) {
        const filter = filters.filters.map(filter => {
            const transformer = this.filterTransformers.get(filter.operator.value);
            if (!transformer) {
                throw Error(`Unexpected operator value ${filter.operator.value}`);
            }
            return transformer(filter);
        });
        return Object.assign({}, ...filter);
    }
    generateSort(order) {
        return {
            [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]: order.orderType.isAsc() ? 1 : -1
        };
    }
    equalFilter(filter) {
        return { [filter.field.value]: { $eq: filter.value.value } };
    }
    notEqualFilter(filter) {
        return { [filter.field.value]: { $ne: filter.value.value } };
    }
    greaterThanFilter(filter) {
        return { [filter.field.value]: { $gt: filter.value.value } };
    }
    lowerThanFilter(filter) {
        return { [filter.field.value]: { $lt: filter.value.value } };
    }
    containsFilter(filter) {
        return { [filter.field.value]: { $regex: filter.value.value } };
    }
    notContainsFilter(filter) {
        return { [filter.field.value]: { $not: { $regex: filter.value.value } } };
    }
}
exports.MongoCriteriaConverter = MongoCriteriaConverter;
