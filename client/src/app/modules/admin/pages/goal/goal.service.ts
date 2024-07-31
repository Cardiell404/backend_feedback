import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Goal } from './goal.models';

@Injectable({
    providedIn: 'root'
})
export class GoalService {
    private _goals: BehaviorSubject<Goal[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._goals = new BehaviorSubject(null);
    }

    get goals$(): Observable<Goal[]> {
        return this._goals.asObservable();
    }

    /**
     * Search goals
     */
    searchGoals(page: number = 1): Observable<Goal[]> {
        return this._httpClient.post<Goal[]>(`${environment.apiUrl}goals/search?limit=${page}&offset=9`, null).pipe(
            map(response => response.map(item => new Goal(item))),
            tap(goals => this._goals.next(goals))
        );
    }

    /**
     * Get goals
     */
    getGoals(): Observable<Goal[]> {
        return this._httpClient.post<Goal[]>(`${environment.apiUrl}goals/search`, null).pipe(
            map(response => response.map(item => new Goal(item))),
            tap(goals => this._goals.next(goals))
        );
    }


    /**
     * Create a new goal
     */
    createGoal(goal: Goal): Observable<Goal> {
        return this.goals$.pipe(take(1),
            switchMap(goals => this._httpClient.post<Goal>(`${environment.apiUrl}goals`, {...goal}).pipe(map((newGoal) => {
            goal.id = newGoal.id;
            this._goals.next([...goals, goal]);
            return goal;
            })
        )));
    }

    /**
     * Update goal
     */
    updateGoal(id: string, newGoal: Goal): Observable<Goal> {
        return this.goals$.pipe(take(1),
        switchMap(goal => this._httpClient.put(`goals/${id}`, { id, ...newGoal }).pipe(map( _ => {
                const index = goal.findIndex(item => item.id === id);
                goal[index] = newGoal;
                this._goals.next(goal);
                return newGoal;
            })
        )));
    }
    
    /**
     * Delete goal
     */
    deleteGoal(id: string): Observable<boolean> {
        return this.goals$.pipe(take(1),
            switchMap(goal => this._httpClient.delete(`goals/${id}`).pipe( map(_ => {
                const index = goal.findIndex(item => item.id === id);
                goal.splice(index, 1);
                this._goals.next(goal);
                return true;
            })
        )));
    }
}
