import { Injectable } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class FeedbackUtilsService {

    constructor() {
    }

    get exactMatchOptions(): IsActiveMatchOptions {
        return {
            paths       : 'exact',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'exact'
        };
    }

    get subsetMatchOptions(): IsActiveMatchOptions {
        return {
            paths       : 'subset',
            fragment    : 'ignored',
            matrixParams: 'ignored',
            queryParams : 'subset'
        };
    }

    /**
     * Generates a random id
     *
     * @param length
     */
    randomId(length: number = 10): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let name = '';

        for ( let i = 0; i < 10; i++ ) {
            name += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return name;
    }
}
