import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FeedbackAlertService {
    private readonly _onDismiss: ReplaySubject<string> = new ReplaySubject<string>(1);
    private readonly _onShow: ReplaySubject<string> = new ReplaySubject<string>(1);

    constructor() {
    }

    get onDismiss(): Observable<any> {
        return this._onDismiss.asObservable();
    }

    get onShow(): Observable<any> {
        return this._onShow.asObservable();
    }

    /**
     * Dismiss the alert
     *
     * @param name
     */
    dismiss(name: string): void {
        if ( !name ) {
            return;
        }
        this._onDismiss.next(name);
    }

    /**
     * Show the dismissed alert
     *
     * @param name
     */
    show(name: string): void {
        if ( !name ) {
            return;
        }
        this._onShow.next(name);
    }
}
