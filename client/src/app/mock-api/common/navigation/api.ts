import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FeedbackNavigationItem } from '@feedback/components/navigation';
import { FeedbackMockApiService } from '@feedback/lib/mock-api';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{
    private readonly _defaultNavigation: FeedbackNavigationItem[] = defaultNavigation;

    /**
     * Constructor
     */
    constructor(private _feedbackMockApiService: FeedbackMockApiService) {
        this.registerHandlers();
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._feedbackMockApiService.onGet('api/common/navigation').reply(() => {
            return [ 200, { default: cloneDeep(this._defaultNavigation) }
            ];
        });
    }
}
