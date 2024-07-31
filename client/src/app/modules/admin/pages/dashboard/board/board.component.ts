import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from 'app/modules/admin/pages/dashboard/dashboard.service';
import { Board } from 'app/modules/admin/pages/dashboard/dashboard.models';
import { Task } from '../tasks.types';
import { MatDialog } from '@angular/material/dialog';
import { SelectUniversalCardComponent } from './select-universal-card/select-universal-card.component';

@Component({
    selector       : 'dashboard-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardBoardComponent implements OnInit, OnDestroy {
    boards: Board[];
    task: Task;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _dashboardService: DashboardService, ) {
    }


    ngOnInit(): void {
        this._dashboardService.boards$.pipe(takeUntil(this._unsubscribeAll)).subscribe((boards: Board[]) => {
            this.boards = [...boards];
            this._changeDetectorRef.markForCheck();
        });
        this.task = { dueDate: '10/10/2022', priority: 0}
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * 
     * Add universal card
     */
    addUniversalCard() {
        this._matDialog.open(SelectUniversalCardComponent, { autoFocus: false,
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
    
    /**
     * Set the task priority
     *
     * @param priority
     */
    setTaskPriority(priority): void {
        this.task.priority = priority;
    }
}
