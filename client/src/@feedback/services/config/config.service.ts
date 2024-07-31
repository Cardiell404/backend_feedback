import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { merge } from 'lodash-es';
import { FEEDBACK_APP_CONFIG } from '@feedback/services/config/config.constants';

@Injectable({
    providedIn: 'root'
})
export class FeedbackConfigService {
    private _config: BehaviorSubject<any>;

    constructor(@Inject(FEEDBACK_APP_CONFIG) config: any) {
        this._config = new BehaviorSubject(config);
    }

    set config(value: any) {
        const config = merge({}, this._config.getValue(), value);
        this._config.next(config);
    }

    get config$(): Observable<any> {
        return this._config.asObservable();
    }

    /**
     * Resets the config to the default
     */
    reset(): void {
        this._config.next(this.config);
    }
}
