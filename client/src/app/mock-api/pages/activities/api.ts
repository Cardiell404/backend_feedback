import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FeedbackMockApiService } from '@feedback/lib/mock-api';
import { activities as activitiesData } from 'app/mock-api/pages/activities/data';

@Injectable({
    providedIn: 'root'
})
export class ActivitiesMockApi {
    private _activities: any = activitiesData;

    constructor(private _feedbackMockApiService: FeedbackMockApiService) {
        this.registerHandlers();
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        this._feedbackMockApiService.onGet('api/pages/activities').reply(() => [200, cloneDeep(this._activities)]);
    }
}
