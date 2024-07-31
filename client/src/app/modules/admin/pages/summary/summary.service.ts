import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Summary } from './summary.models';

@Injectable({
    providedIn: 'root'
})
export class SummaryService {
    private _summary: BehaviorSubject<Summary[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._summary = new BehaviorSubject(null);
    }

    get summary$(): Observable<Summary[]> {
        return this._summary.asObservable();
    }

    /**
     * Get summary
     */
    getSummary(): Observable<Summary[]> {
        return this._httpClient.post<Summary[]>(`${environment.apiUrl}feedback/search`, null).pipe(
            map(response => response.map(item => new Summary(item))),
            tap(summary => this._summary.next(summary))
        );
    }
}
