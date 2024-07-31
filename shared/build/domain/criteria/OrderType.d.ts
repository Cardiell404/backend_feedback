import { EnumValueObject } from '../value-object/EnumValueObject';
export declare enum OrderTypes {
    ASC = "asc",
    DESC = "desc",
    NONE = "none"
}
export declare class OrderType extends EnumValueObject<OrderTypes> {
    constructor(value: OrderTypes);
    static fromValue(value: string): OrderType;
    isNone(): boolean;
    isAsc(): boolean;
    protected throwErrorForInvalidValue(value: OrderTypes): void;
}
