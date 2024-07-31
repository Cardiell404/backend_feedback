import { NewFeedbackComponent } from './new-feedback/new-feedback.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Task } from '../tasks.types';
import { MatDialog } from '@angular/material/dialog';
import { SelectUniversalCardComponent } from '../../dashboard/board/select-universal-card/select-universal-card.component';
import { Feedback } from '../feedback.models';
import { FeedbackService } from '../feedback.service';

@Component({
    selector       : 'feedback-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackBoardComponent implements OnInit, OnDestroy {
    feedback: Feedback[] = [];
    page: number = 1;
    task: Task;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _feedbackService: FeedbackService, ) {
    }


    ngOnInit(): void {
        this._feedbackService.feedback$.pipe(takeUntil(this._unsubscribeAll)).subscribe((feedback: Feedback[]) => {
            this.feedback.push(...feedback);
            console.log(this.feedback)
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
     * Add Feedback
     */
    addFeedback() {
        this._matDialog.open(NewFeedbackComponent, { autoFocus: false,
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
    
    /**
     * Set the task priority
     *
     * @param priority
     */
    setTaskPriority(priority): void {
        this.task.priority = priority;
    }

    onScroll() {
        this._feedbackService.searchFeedback(++this.page).subscribe();
    }
}
