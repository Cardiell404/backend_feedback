import { User } from '../user/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { environment } from './../../../environments/environment';

@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    constructor( private _httpClient: HttpClient,  private _userService: UserService ) {
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        if ( this._authenticated )  {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.apiUrl}auth/login`, credentials).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    signInUsingToken(): Observable<any> {
        return this._httpClient.get(`${ environment.apiUrl }auth/currentuser`).pipe(
            switchMap((response: any) => {
                console.log(response);
                this._authenticated = true;
                this._userService.user = new User(response);
                return of(true);
            }),
            catchError(() =>  of(false) ),
        );
    }

    signOut(): Observable<any> {
        return this._httpClient.post(`${ environment.apiUrl }auth/signout`, {}).pipe(
            catchError(() =>  of(false) ),
            switchMap(() => {
                this._authenticated = false;
                return of(true);
            })
        );
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        if ( this._authenticated ) {
            console.log('_authenticated: ', this._authenticated);
            return of(true);
        }

        return this.signInUsingToken();
    }
}
