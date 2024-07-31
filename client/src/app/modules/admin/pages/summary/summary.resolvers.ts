import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Summary } from './summary.models';
import { SummaryService } from './summary.service';

@Injectable({
    providedIn: 'root'
})
export class SummaryResolver implements Resolve<any> {

    constructor( private _summaryService: SummaryService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Summary[]> {
            return this._summaryService.getSummary()
    }
}
