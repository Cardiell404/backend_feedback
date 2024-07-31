import { FilterField } from './FilterField';
import { FilterOperator } from './FilterOperator';
import { FilterValue } from './FilterValue';
export declare class Filter {
    readonly field: FilterField;
    readonly operator: FilterOperator;
    readonly value: FilterValue;
    constructor(field: FilterField, operator: FilterOperator, value: FilterValue);
    static fromValues(values: Map<string, string>): Filter;
}
