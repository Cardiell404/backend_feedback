import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_showAvatar: BooleanInput;
    @Input() showAvatar: boolean = true;
    user: IUser;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(  private _changeDetectorRef: ChangeDetectorRef, private _router: Router, private _userService: UserService ) {
    }

    ngOnInit(): void {
        this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user: IUser) => {
            this.user = user;
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Update the user status
     *
     * @param status
     */
    updateUserStatus(status: string): void {
        if ( !this.user ) {
            return;
        }

        this._userService.update({ ...this.user, status }).subscribe();
    }

    /**
     * Sign out
     */
    signOut(): void {
        this._router.navigate(['/sign-out']);
    }
}
