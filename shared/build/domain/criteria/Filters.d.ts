import { Filter } from './Filter';
export declare class Filters {
    readonly filters: Filter[];
    constructor(filters: Filter[]);
    static fromValues(filters: Array<Map<string, string>>): Filters;
    static none(): Filters;
}
