import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.models';

@Injectable({
    providedIn: 'root'
})
export class FeedbackResolver implements Resolve<any> {

    constructor( private _feedbackService: FeedbackService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Feedback[]> {
            return this._feedbackService.searchFeedback(0)
    }
}
