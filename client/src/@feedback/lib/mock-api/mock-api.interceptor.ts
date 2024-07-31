import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { delay, Observable, of, switchMap, throwError } from 'rxjs';
import { FEEDBACK_MOCK_API_DEFAULT_DELAY } from '@feedback/lib/mock-api/mock-api.constants';
import { FeedbackMockApiService } from '@feedback/lib/mock-api/mock-api.service';

@Injectable({
    providedIn: 'root'
})
export class FeedbackMockApiInterceptor implements HttpInterceptor {

    constructor( @Inject(FEEDBACK_MOCK_API_DEFAULT_DELAY) private _defaultDelay: number, private _feedbackMockApiService: FeedbackMockApiService ) {
    }

    /**
     * Intercept
     *
     * @param request
     * @param next
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { handler, urlParams } = this._feedbackMockApiService.findHandler(request.method.toUpperCase(), request.url);

        if ( !handler ) {
            return next.handle(request);
        }

        handler.request = request;
        handler.urlParams = urlParams;

        return handler.response.pipe( delay(handler.delay ?? this._defaultDelay ?? 0), switchMap((response) => {
            if ( !response ) {
                response = new HttpErrorResponse({ error: 'NOT FOUND', status: 404, statusText: 'NOT FOUND' });
                return throwError(response);
            }

            const data = { status: response[0], body: response[1] };

            if ( data.status >= 200 && data.status < 300 ) {
                response = new HttpResponse({ body: data.body, status: data.status, statusText: 'OK' });
                return of(response);
            }

            response = new HttpErrorResponse({ error: data.body.error, status: data.status, statusText: 'ERROR' });
            return throwError(response);
        }));
    }
}
