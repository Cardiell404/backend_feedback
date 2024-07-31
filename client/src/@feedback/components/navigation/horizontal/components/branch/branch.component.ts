import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatMenu } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackHorizontalNavigationComponent } from '@feedback/components/navigation/horizontal/horizontal.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Component({
    selector       : 'feedback-horizontal-navigation-branch-item',
    templateUrl    : './branch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackHorizontalNavigationBranchItemComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_child: BooleanInput;

    @Input() child: boolean = false;
    @Input() item: FeedbackNavigationItem;
    @Input() name: string;
    @ViewChild('matMenu', {static: true}) matMenu: MatMenu;

    private _feedbackHorizontalNavigationComponent: FeedbackHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackNavigationService: FeedbackNavigationService ) {
    }

    ngOnInit(): void {
        this._feedbackHorizontalNavigationComponent = this._feedbackNavigationService.getComponent(this.name);
        this._feedbackHorizontalNavigationComponent.onRefreshed.pipe( takeUntil(this._unsubscribeAll) ).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Trigger the change detection
     */
    triggerChangeDetection(): void {
        this._changeDetectorRef.markForCheck();
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
