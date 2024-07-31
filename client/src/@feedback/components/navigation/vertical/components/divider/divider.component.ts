import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Component({
    selector       : 'feedback-vertical-navigation-divider-item',
    templateUrl    : './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackVerticalNavigationDividerItemComponent implements OnInit, OnDestroy
{
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
}
