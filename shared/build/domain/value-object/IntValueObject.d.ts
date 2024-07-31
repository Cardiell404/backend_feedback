import { ValueObject } from './ValueObject';
export declare abstract class NumberValueObject extends ValueObject<number> {
    isBiggerThan(other: NumberValueObject): boolean;
}
