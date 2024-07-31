import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { FeedbackLoadingService } from '@feedback/services/loading/loading.service';

@Injectable()
export class FeedbackLoadingInterceptor implements HttpInterceptor {
    handleRequestsAutomatically: boolean;

    constructor( private _feedbackLoadingService: FeedbackLoadingService ) {
        this._feedbackLoadingService.auto$.subscribe((value) => {
            this.handleRequestsAutomatically = value;
        });
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ( !this.handleRequestsAutomatically ) {
            return next.handle(req);
        }
        this._feedbackLoadingService._setLoadingStatus(true, req.url);
        return next.handle(req).pipe( finalize(() => {
            this._feedbackLoadingService._setLoadingStatus(false, req.url);
        }));
    }
}
