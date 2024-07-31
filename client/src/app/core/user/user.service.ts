import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { IUser } from 'app/core/user/user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);

    constructor(private _httpClient: HttpClient) {
    }    

    set user(value: IUser) {
        this._user.next(value);
    }

    get user$(): Observable<IUser> {
        return this._user.asObservable();
    }

    /**
     * Get the current logged in user data
     */
    get(): Observable<IUser> {
        return this._httpClient.get<IUser>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: IUser): Observable<any> {
        return this._httpClient.patch<IUser>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
