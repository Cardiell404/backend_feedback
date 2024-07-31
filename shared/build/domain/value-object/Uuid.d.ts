import { ValueObject } from './ValueObject';
export declare class Uuid extends ValueObject<string> {
    constructor(value: string);
    static random(): Uuid;
    private ensureIsValidUuid;
}
