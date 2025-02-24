import { HttpRequest } from '@angular/common/http';
import { Observable, of, take, throwError } from 'rxjs';
import { FeedbackMockApiReplyCallback } from '@feedback/lib/mock-api/mock-api.types';

export class FeedbackMockApiHandler {
    request!: HttpRequest<any>;
    urlParams!: { [key: string]: string };

    private _reply: FeedbackMockApiReplyCallback = undefined;
    private _replyCount = 0;
    private _replied = 0;

    constructor( public url: string, public delay?: number ) {
    }

    get response(): Observable<any> {
        if ( this._replyCount > 0 && this._replyCount <= this._replied ) {
            return throwError('Execution limit has been reached!');
        }

        if ( !this._reply ) {
            return throwError('Response callback function does not exist!');
        }

        if ( !this.request ) {
            return throwError('Request does not exist!');
        }

        this._replied++;
        const replyResult = this._reply({ request  : this.request, urlParams: this.urlParams });

        if ( replyResult instanceof Observable ) {
            return replyResult.pipe(take(1));
        }

        return of(replyResult).pipe(take(1));
    }

    /**
     * Reply
     *
     * @param callback
     */
    reply(callback: FeedbackMockApiReplyCallback): void {
        this._reply = callback;
    }

    /**
     * Reply count
     *
     * @param count
     */
    replyCount(count: number): void {
        this._replyCount = count;
    }
}


