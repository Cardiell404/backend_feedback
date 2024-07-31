import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any> {

    constructor( private _navigationService: NavigationService, private _notificationsService: NotificationsService, ) {
    }

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return forkJoin([
            this._navigationService.get(),
            this._notificationsService.getAll(),
        ]);
    }
}
