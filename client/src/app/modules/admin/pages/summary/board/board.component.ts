import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject, takeUntil } from 'rxjs';
import { DateTime } from 'luxon';
import { FeedbackConfirmationService } from '@feedback/services/confirmation';
import { DashboardService } from 'app/modules/admin/pages/dashboard/dashboard.service';
import { Board, Card } from 'app/modules/admin/pages/dashboard/dashboard.models';
import { Task } from '../tasks.types';
import { MatDialog } from '@angular/material/dialog';
import { DashboardBoardAddCardComponent } from './add-card/add-card.component';

@Component({
    selector       : 'summary-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryBoardComponent implements OnInit, OnDestroy {
    boards: Board[];
    listTitleForm: UntypedFormGroup;
    task: Task;
    taskForm: UntypedFormGroup;

    // Private
    private readonly _positionStep: number = 65536;
    private readonly _maxListCount: number = 200;
    private readonly _maxPosition: number = this._positionStep * 500;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private _feedbackConfirmationService: FeedbackConfirmationService,
        private _dashboardService: DashboardService,
    )
    {
    }

    
    // @ Lifecycle hooks
    

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Initialize the list title form
        this.listTitleForm = this._formBuilder.group({
            title: ['']
        });

        // Get the board
        this._dashboardService.boards$.pipe(takeUntil(this._unsubscribeAll)).subscribe((boards: Board[]) => {
            this.boards = [...boards];
            this._changeDetectorRef.markForCheck();
        });

                // Create the task form
                this.taskForm = this._formBuilder.group({
                    id       : [''],
                    type     : [''],
                    title    : [''],
                    notes    : [''],
                    completed: [false],
                    dueDate  : [null],
                    priority : [0],
                    tags     : [[]],
                    order    : [0]
                });
                this.task = {priority: 1, dueDate: '10/10/1993'};
    }

    addFeedback() {
        this._matDialog.open(DashboardBoardAddCardComponent, {
            autoFocus: false,
            width: '98%',
            height: '95%',
            maxWidth: '100%',
            data     : {
                note: {}
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    formatDateAsRelative(date: string): string
    {
        return DateTime.fromISO(date).toRelative();
    }


    /**
     * Check if the given ISO_8601 date string is overdue
     *
     * @param date
     */
    isOverdue(date?: string): boolean {
        date = this.task.dueDate || date;
        return DateTime.fromISO(date).startOf('day') < DateTime.now().startOf('day');
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    
    // @ Private methods
    

    /**
     * Calculate and set item positions
     * from given CdkDragDrop event
     *
     * @param event
     * @private
     */
    private _calculatePositions(event: CdkDragDrop<any[]>): any[]
    {
        // Get the items
        let items = event.container.data;
        const currentItem = items[event.currentIndex];
        const prevItem = items[event.currentIndex - 1] || null;
        const nextItem = items[event.currentIndex + 1] || null;

        // If the item moved to the top...
        if ( !prevItem )
        {
            // If the item moved to an empty container
            if ( !nextItem )
            {
                currentItem.position = this._positionStep;
            }
            else
            {
                currentItem.position = nextItem.position / 2;
            }
        }
        // If the item moved to the bottom...
        else if ( !nextItem )
        {
            currentItem.position = prevItem.position + this._positionStep;
        }
        // If the item moved in between other items...
        else
        {
            currentItem.position = (prevItem.position + nextItem.position) / 2;
        }

        // Check if all item positions need to be updated
        if ( !Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition )
        {
            // Re-calculate all orders
            items = items.map((value, index) => {
                value.position = (index + 1) * this._positionStep;
                return value;
            });

            // Return items
            return items;
        }

        // Return currentItem
        return [currentItem];
    }
    
        /**
     * Set the task priority
     *
     * @param priority
     */
         setTaskPriority(priority): void
         {
             // Set the value
             console.log(priority)
            //  this.taskForm.get('priority').setValue(priority);
         }
}
