export declare abstract class EnumValueObject<T> {
    readonly validValues: T[];
    readonly value: T;
    constructor(value: T, validValues: T[]);
    checkValueIsValid(value: T): void;
    protected abstract throwErrorForInvalidValue(value: T): void;
}
