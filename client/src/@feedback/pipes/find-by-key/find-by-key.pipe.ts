import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'feedbackFindByKey',
    pure: false
})
export class FeedbackFindByKeyPipe implements PipeTransform {
    constructor() {
    }

    /**
     * Transform
     *
     * @param value A string or an array of strings to find from source
     * @param key Key of the object property to look for
     * @param source Array of objects to find from
     */
    transform(value: string | string[], key: string, source: any[]): any {
        if ( Array.isArray(value) ) {
            return value.map(item => source.find(sourceItem => sourceItem[key] === item));
        }
        return source.find(sourceItem => sourceItem[key] === value);
    }
}
