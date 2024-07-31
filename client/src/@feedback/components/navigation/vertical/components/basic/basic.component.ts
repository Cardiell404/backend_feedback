import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';

@Component({
    selector       : 'feedback-vertical-navigation-basic-item',
    templateUrl    : './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackVerticalNavigationBasicItemComponent implements OnInit, OnDestroy {
    @Input() item: FeedbackNavigationItem;
    @Input() name: string;

    isActiveMatchOptions: IsActiveMatchOptions;
    private _feedbackVerticalNavigationComponent: FeedbackVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackNavigationService: FeedbackNavigationService, private _feedbackUtilsService: FeedbackUtilsService ) {
        this.isActiveMatchOptions = this._feedbackUtilsService.subsetMatchOptions;
    }

    ngOnInit(): void {
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._feedbackUtilsService.exactMatchOptions
                : this._feedbackUtilsService.subsetMatchOptions;

        this._feedbackVerticalNavigationComponent = this._feedbackNavigationService.getComponent(this.name);
        this._changeDetectorRef.markForCheck();

        this._feedbackVerticalNavigationComponent.onRefreshed.pipe( takeUntil(this._unsubscribeAll) ).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
