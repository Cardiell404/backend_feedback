import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Conversation } from './conversation.models';
import { ConversationService } from './conversation.service';

@Injectable({
    providedIn: 'root'
})
export class ConversationResolver implements Resolve<any> {

    constructor( private _conversationService: ConversationService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conversation[]> {
            return this._conversationService.searchConversations(1)
    }
}
