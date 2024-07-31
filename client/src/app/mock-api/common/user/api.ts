import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FeedbackMockApiService } from '@feedback/lib/mock-api';
import { user as userData } from 'app/mock-api/common/user/data';

@Injectable({
    providedIn: 'root'
})
export class UserMockApi {
    private _user: any = userData;

    constructor(private _feedbackMockApiService: FeedbackMockApiService) {
        this.registerHandlers();
    }

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
                
        this._feedbackMockApiService
            .onGet('api/common/user')
            .reply(() => [200, cloneDeep(this._user)]);

                
        this._feedbackMockApiService
            .onPatch('api/common/user')
            .reply(({request}) => {
                const user = cloneDeep(request.body.user);
                this._user = assign({}, this._user, user);
                return [200, cloneDeep(this._user)];
            });
    }
}
