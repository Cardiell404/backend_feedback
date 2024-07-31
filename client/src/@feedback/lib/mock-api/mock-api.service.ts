import { Injectable } from '@angular/core';
import { compact, fromPairs } from 'lodash-es';
import { FeedbackMockApiHandler } from '@feedback/lib/mock-api/mock-api.request-handler';
import { FeedbackMockApiMethods } from '@feedback/lib/mock-api/mock-api.types';

@Injectable({
    providedIn: 'root'
})
export class FeedbackMockApiService {
    private _handlers: { [key: string]: Map<string, FeedbackMockApiHandler> } = {
        'get'    : new Map<string, FeedbackMockApiHandler>(),
        'post'   : new Map<string, FeedbackMockApiHandler>(),
        'patch'  : new Map<string, FeedbackMockApiHandler>(),
        'delete' : new Map<string, FeedbackMockApiHandler>(),
        'put'    : new Map<string, FeedbackMockApiHandler>(),
        'head'   : new Map<string, FeedbackMockApiHandler>(),
        'jsonp'  : new Map<string, FeedbackMockApiHandler>(),
        'options': new Map<string, FeedbackMockApiHandler>()
    };

    constructor() {
    }

    /**
     * Find the handler from the service
     * with the given method and url
     *
     * @param method
     * @param url
     */
    findHandler(method: string, url: string): { handler: FeedbackMockApiHandler | undefined; urlParams: { [key: string]: string } } {
        const matchingHandler: { handler: FeedbackMockApiHandler | undefined; urlParams: { [key: string]: string } } = {
            handler  : undefined,
            urlParams: {}
        };

        const urlParts = url.split('/');
        const handlers = this._handlers[method.toLowerCase()];
        handlers.forEach((handler, handlerUrl) => {
            if ( matchingHandler.handler ) {
                return;
            }

            const handlerUrlParts = handlerUrl.split('/');
            if ( urlParts.length !== handlerUrlParts.length ){
                return;
            }

            const matches = handlerUrlParts.every((handlerUrlPart, index) => handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':'));
            if ( matches ) {
                matchingHandler.handler = handler;
                matchingHandler.urlParams = fromPairs(compact(handlerUrlParts.map((handlerUrlPart, index) =>
                    handlerUrlPart.startsWith(':') ? [handlerUrlPart.substring(1), urlParts[index]] : undefined
                )));
            }
        });
        return matchingHandler;
    }

    /**
     * Register GET request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onGet(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('get', url, delay);
    }

    /**
     * Register POST request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPost(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('post', url, delay);
    }

    /**
     * Register PATCH request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPatch(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('patch', url, delay);
    }

    /**
     * Register DELETE request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onDelete(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('delete', url, delay);
    }

    /**
     * Register PUT request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPut(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('put', url, delay);
    }

    /**
     * Register HEAD request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onHead(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('head', url, delay);
    }

    /**
     * Register JSONP request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onJsonp(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('jsonp', url, delay);
    }

    /**
     * Register OPTIONS request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onOptions(url: string, delay?: number): FeedbackMockApiHandler {
        return this._registerHandler('options', url, delay);
    }

    /**
     * Register and return a new instance of the handler
     *
     * @param method
     * @param url
     * @param delay
     * @private
     */
    private _registerHandler(method: FeedbackMockApiMethods, url: string, delay?: number): FeedbackMockApiHandler {
        const feedbackMockHttp = new FeedbackMockApiHandler(url, delay);
        this._handlers[method].set(url, feedbackMockHttp);
        return feedbackMockHttp;
    }
}
