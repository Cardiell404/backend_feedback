export declare abstract class ValueObject<T extends Object> {
    private _value;
    constructor(value: T);
    value(): T;
    equals(o: ValueObject<T>): boolean;
    toJSON(): string;
    toString(): string;
    valueOf(): T;
}
