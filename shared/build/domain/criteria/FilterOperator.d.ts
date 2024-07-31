import { EnumValueObject } from '../value-object/EnumValueObject';
export declare enum Operator {
    EQUAL = "=",
    NOT_EQUAL = "!=",
    GT = ">",
    LT = "<",
    CONTAINS = "CONTAINS",
    NOT_CONTAINS = "NOT_CONTAINS"
}
export declare class FilterOperator extends EnumValueObject<Operator> {
    constructor(value: Operator);
    static fromValue(value: string): FilterOperator;
    isPositive(): boolean;
    protected throwErrorForInvalidValue(value: Operator): void;
    static equal(): FilterOperator;
}
