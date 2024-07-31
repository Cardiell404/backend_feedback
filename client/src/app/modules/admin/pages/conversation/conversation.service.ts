import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Conversation } from './conversation.models';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private _conversations: BehaviorSubject<Conversation[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._conversations = new BehaviorSubject(null);
    }

    get conversations$(): Observable<Conversation[]> {
        return this._conversations.asObservable();
    }

    /**
     * Search conversations
     */
    searchConversations(page: number = 1): Observable<Conversation[]> {
        return this._httpClient.post<Conversation[]>(`${environment.apiUrl}conversations/search?limit=${page}&offset=9`, null).pipe(
            map(response => response.map(item => new Conversation(item))),
            tap(conversation => this._conversations.next(conversation))
        );
    }

    /**
     * Get conversation
     */
    getConversations(): Observable<Conversation[]> {
        return this._httpClient.post<Conversation[]>(`${environment.apiUrl}conversations/search`, null).pipe(
            map(response => response.map(item => new Conversation(item))),
            tap(conversation => this._conversations.next(conversation))
        );
    }

    /**
     * Create a new conversation
     */
    createConversation(conversation: Conversation): Observable<Conversation> {
        return this.conversations$.pipe(take(1),
            switchMap(goals => this._httpClient.post<Conversation>(`${environment.apiUrl}conversations`, {...conversation}).pipe(map((newConversation) => {
            conversation.id = newConversation.id;
            this._conversations.next([...goals, conversation]);
            return conversation;
            })
            ))
        );
    }

    /**
     * Update conversation
     */
    updateConversation(id: string, newConversation: Conversation): Observable<Conversation> {
        return this.conversations$.pipe(take(1),
        switchMap(conversation => this._httpClient.put(`conversations/${id}`, { id, ...newConversation }).pipe(map( _ => {
                const index = conversation.findIndex(item => item.id === id);
                conversation[index] = newConversation;
                this._conversations.next(conversation);
                return newConversation;
            })
            ))
        );
        }
    
    /**
     * Delete conversation
     */
    deleteConversation(id: string): Observable<boolean> {
        return this.conversations$.pipe(take(1),
            switchMap(conversation => this._httpClient.delete(`conversations/${id}`).pipe( map(_ => {
                const index = conversation.findIndex(item => item.id === id);
                conversation.splice(index, 1);
                this._conversations.next(conversation);
                return true;
            })
            ))
        );
    }
}
