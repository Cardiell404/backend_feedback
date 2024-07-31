export type Primitives = String | string | number | Boolean | boolean | Date;
export declare abstract class ValueObject<T extends Primitives> {
    readonly value: T;
    constructor(value: T);
    private ensureValueIsDefined;
    equals(other: ValueObject<T>): boolean;
    toString(): string;
}
