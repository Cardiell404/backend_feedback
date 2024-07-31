import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ReflectionService } from './reflection.service';
import { Reflection } from './reflection.models';

@Injectable({
    providedIn: 'root'
})
export class ReflectionResolver implements Resolve<any> {

    constructor( private _reflectionService: ReflectionService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Reflection[]> {
            return this._reflectionService.searchReflections(1)
    }
}
