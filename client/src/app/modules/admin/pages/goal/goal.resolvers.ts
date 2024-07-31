import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from './goal.service';
import { Goal } from './goal.models';

@Injectable({
    providedIn: 'root'
})
export class GoalResolver implements Resolve<any> {

    constructor( private _goalService: GoalService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Goal[]> {
            return this._goalService.searchGoals(1)
    }
}
