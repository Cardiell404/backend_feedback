import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Component({
    selector       : 'feedback-vertical-navigation-group-item',
    templateUrl    : './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackVerticalNavigationGroupItemComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_autoCollapse: BooleanInput;

    @Input() autoCollapse: boolean;
    @Input() item: FeedbackNavigationItem;
    @Input() name: string;

    private _feedbackVerticalNavigationComponent: FeedbackVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackNavigationService: FeedbackNavigationService ) {
    }

    ngOnInit(): void {
        this._feedbackVerticalNavigationComponent = this._feedbackNavigationService.getComponent(this.name);
        this._feedbackVerticalNavigationComponent.onRefreshed.pipe( takeUntil(this._unsubscribeAll) ).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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
}
