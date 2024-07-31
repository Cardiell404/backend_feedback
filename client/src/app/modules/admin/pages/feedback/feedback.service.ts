import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Feedback } from './feedback.models';

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private _feedback: BehaviorSubject<Feedback[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._feedback = new BehaviorSubject(null);
    }

    get feedback$(): Observable<Feedback[]> {
        return this._feedback.asObservable();
    }

    /**
     * Search feedback
     */
    searchFeedback(page: number = 0): Observable<Feedback[]> {
        return this._httpClient.post<Feedback[]>(`${environment.apiUrl}feedback/search?limit=${page}&offset=9`, null).pipe(
            map(response => response.map(item => new Feedback({
                title: item.title,
                description: item.description,
                id: item.description,
                createDate: item.createDate,
                additionalDetails: item.additionalDetails,
                responses: item.responses
            }))),
            tap(feedback => this._feedback.next(feedback))
        );
    }

    /**
     * Get feedback
     */
    getFeedback(): Observable<Feedback[]> {
        return this._httpClient.post<Feedback[]>(`${environment.apiUrl}feedback/search`, null).pipe(
            map(response => response.map(item => new Feedback({
                title: item.title,
                description: item.description,
                id: item.description,
                createDate: item.createDate,
                additionalDetails: item.additionalDetails,
                responses: item.responses
            }))),
            tap(feedback => this._feedback.next(feedback))
        );
    }

    /**
     * Create feedback
     */
    createFeedback(newFeedback: Feedback): Observable<Feedback> {
        return this.feedback$.pipe(take(1), switchMap(feedback => this._httpClient.post<string>('feedback', {...newFeedback}).pipe(map((idFeedback) => {
            newFeedback.id = idFeedback;
            this._feedback.next([...feedback, newFeedback]);
            return newFeedback;
          })
        )));
    }

    /**
     * Update feedback
     */
    updateFeedback(id: string, newFeedback: Feedback): Observable<Feedback> {
        return this.feedback$.pipe(take(1),
        switchMap(feedback => this._httpClient.put(`feedback/${id}`, { id, ...newFeedback }).pipe(map( _ => {
              const index = feedback.findIndex(item => item.id === id);
              feedback[index] = newFeedback;
              this._feedback.next(feedback);
              return newFeedback;
            })
          ))
        );
      }
    
    /**
     * Delete feedback
     */
    deleteFeedback(id: string): Observable<boolean> {
        return this.feedback$.pipe(take(1), switchMap(feedback => this._httpClient.delete(`feedback/${id}`).pipe( map(_ => {
                const index = feedback.findIndex(item => item.id === id);
                feedback.splice(index, 1);
                this._feedback.next(feedback);
                return true;
            })
        )));
    }
}
