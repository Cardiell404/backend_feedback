import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackMediaWatcherService } from '@feedback/services/media-watcher';
import { FeedbackNavigationService, FeedbackVerticalNavigationComponent } from '@feedback/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { IUser } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ClassyLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    user: IUser;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _activatedRoute: ActivatedRoute, private _router: Router, private _navigationService: NavigationService,
        private _userService: UserService, private _feedbackMediaWatcherService: FeedbackMediaWatcherService, private _feedbackNavigationService: FeedbackNavigationService ) {
    }


    ngOnInit(): void {
        this._navigationService.navigation$.pipe(takeUntil(this._unsubscribeAll)).subscribe((navigation: Navigation) => {
            this.navigation = navigation;
        });

        this._userService.user$.pipe((takeUntil(this._unsubscribeAll))).subscribe((user: IUser) => {
            this.user = user;
        });

        this._feedbackMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({matchingAliases}) => {
            this.isScreenSmall = !matchingAliases.includes('md');
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        const navigation = this._feedbackNavigationService.getComponent<FeedbackVerticalNavigationComponent>(name);
        if ( navigation ) {
            navigation.toggle();
        }
    }
}
