import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackLoadingService } from '@feedback/services/loading';

@Component({
    selector     : 'feedback-loading-bar',
    templateUrl  : './loading-bar.component.html',
    styleUrls    : ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'feedbackLoadingBar'
})
export class FeedbackLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
    @Input() autoMode: boolean = true;
    mode: 'determinate' | 'indeterminate';
    progress: number = 0;
    show: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(private _feedbackLoadingService: FeedbackLoadingService) {
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'autoMode' in changes ) {
            this._feedbackLoadingService.setAutoMode(coerceBooleanProperty(changes.autoMode.currentValue));
        }
    }

    ngOnInit(): void {
        this._feedbackLoadingService.mode$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.mode = value;
        });

        this._feedbackLoadingService.progress$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.progress = value;
        });

        this._feedbackLoadingService.show$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.show = value;
        });

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
