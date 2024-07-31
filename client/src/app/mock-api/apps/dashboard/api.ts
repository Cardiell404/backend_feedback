import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FeedbackMockApiService } from '@feedback/lib/mock-api';
import { boards as boardsData, cards as cardsData } from 'app/mock-api/apps/dashboard/data';

@Injectable({
    providedIn: 'root'
})
export class DashboardMockApi {
    private _boards: any[] = boardsData;
    private _cards: any[] = cardsData;

    constructor(private _feedbackMockApiService: FeedbackMockApiService) {
        this.registerHandlers();
    }


    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        
        this._feedbackMockApiService.onGet('api/pages/dashboard/boards').reply(({request}) => {
            let boards = cloneDeep(this._boards);
            return [ 200, boards ];
        });

        // @ Cards - Get
        
        this._feedbackMockApiService
            .onGet('api/pages/dashboard/cards')
            .reply(({request}) => {
                let cards = cloneDeep(this._cards);
                return [ 200, cards ];
            });
    }
}
