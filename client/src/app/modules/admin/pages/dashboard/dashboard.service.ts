import { UniversalCard } from './dashboard.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Board } from 'app/modules/admin/pages/dashboard/dashboard.models';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private _boards: BehaviorSubject<Board[] | null>;
    private _universalCards: BehaviorSubject<UniversalCard[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._boards = new BehaviorSubject(null);
        this._universalCards = new BehaviorSubject(null);
    }

    get boards$(): Observable<Board[]> {
        return this._boards.asObservable();
    }

    get universalCards$(): Observable<UniversalCard[]> {
        return this._universalCards.asObservable();
    }

    /**
     * Get boards
     */
    getBoards(): Observable<Board[]> {
        return this._httpClient.get<Board[]>('api/pages/dashboard/boards').pipe(
            map(response => response.map(item => new Board(item))),
            tap(boards => this._boards.next(boards))
        );
    }

    /**
     * Get universal cards
     */
    getUniversalCards(): Observable<UniversalCard[]> {
        return this._httpClient.get<UniversalCard[]>('api/pages/dashboard/cards').pipe(
            map(response => response.map(item => new UniversalCard(item))),
            tap(universalCards => this._universalCards.next(universalCards))
        );
    }
}
