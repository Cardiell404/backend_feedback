import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Reflection } from './reflection.models';

@Injectable({
    providedIn: 'root'
})
export class ReflectionService {
    private _reflections: BehaviorSubject<Reflection[] | null>;

    constructor( private _httpClient: HttpClient ) {
        this._reflections = new BehaviorSubject(null);
    }

    get reflections$(): Observable<Reflection[]> {
        return this._reflections.asObservable();
    }

    /**
     * Search reflections
     */
    searchReflections(page: number = 1): Observable<Reflection[]> {
        return this._httpClient.post<Reflection[]>(`${environment.apiUrl}reflections/search?limit=${page}&offset=9`, null).pipe(
            map(response => response.map(item => new Reflection(item))),
            tap(reflections => this._reflections.next(reflections))
        );
    }

    /**
     * Get reflections
     */
    getReflections(): Observable<Reflection[]> {
        return this._httpClient.post<Reflection[]>(`${environment.apiUrl}reflections/search`, null).pipe(
            map(response => response.map(item => new Reflection(item))),
            tap(reflections => this._reflections.next(reflections))
        );
    }

    /**
     * Create a new reflection
     */
    createReflection(reflection: Reflection): Observable<Reflection> {
        return this.reflections$.pipe(take(1),
            switchMap(goals => this._httpClient.post<Reflection>(`${environment.apiUrl}reflections`, {...reflection}).pipe(map((newReflection) => {
                reflection.id = newReflection.id;
            this._reflections.next([...goals, reflection]);
            return reflection;
            })
        )));
    }

    /**
     * Update reflection
     */
    updateReflection(id: string, newReflection: Reflection): Observable<Reflection> {
        return this.reflections$.pipe(take(1),
        switchMap(reflection => this._httpClient.put(`reflections/${id}`, { id, ...newReflection }).pipe(map( _ => {
                const index = reflection.findIndex(item => item.id === id);
                reflection[index] = newReflection;
                this._reflections.next(reflection);
                return newReflection;
            })
        )));
    }
    
    /**
     * Delete reflection
     */
    deleteGoal(id: string): Observable<boolean> {
        return this.reflections$.pipe(take(1),
            switchMap(reflection => this._httpClient.delete(`reflections/${id}`).pipe( map(_ => {
                const index = reflection.findIndex(item => item.id === id);
                reflection.splice(index, 1);
                this._reflections.next(reflection);
                return true;
            })
        )));
    }
}
