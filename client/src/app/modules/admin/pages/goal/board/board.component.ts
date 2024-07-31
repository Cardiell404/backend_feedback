import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Goal } from '../goal.models';
import { GoalService } from '../goal.service';
import { NewGoalComponent } from './new-goal/new-goal.component';
import { UserService } from 'app/core/user/user.service';
import { IUser } from 'app/core/user/user.types';

@Component({
    selector       : 'goal-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalBoardComponent implements OnInit, OnDestroy {
    goals: Goal[] = [];
    page: number = 1;
    user: IUser;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _goalService: GoalService,
                 private _userService: UserService ) {
    }


    ngOnInit(): void {
        this._goalService.goals$.pipe(takeUntil(this._unsubscribeAll)).subscribe((goals: Goal[]) => {
            this.goals.push(...goals);
            this._changeDetectorRef.markForCheck();
        });
        this._userService.user$.subscribe((user) => {
            this.user = user;
        })
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * 
     * Add Goal
     */
    addGoal() {
        this._matDialog.open(NewGoalComponent, { autoFocus: false,
            maxWidth: '100vw',
            maxHeight: '100vw',
            width: '95vw',
            height: '95vh',
            data     : {
                note: {}
            }
        });
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }


    onScroll() {
        this._goalService.searchGoals(++this.page).subscribe();
    }
}
