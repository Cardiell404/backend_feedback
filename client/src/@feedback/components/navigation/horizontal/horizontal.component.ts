import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';

@Component({
    selector       : 'feedback-horizontal-navigation',
    templateUrl    : './horizontal.component.html',
    styleUrls      : ['./horizontal.component.scss'],
    animations     : feedbackAnimations,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'feedbackHorizontalNavigation'
})
export class FeedbackHorizontalNavigationComponent implements OnChanges, OnInit, OnDestroy {
    @Input() name: string = this._feedbackUtilsService.randomId();
    @Input() navigation: FeedbackNavigationItem[];

    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackNavigationService: FeedbackNavigationService,
        private _feedbackUtilsService: FeedbackUtilsService ) {
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'navigation' in changes ) {
            this._changeDetectorRef.markForCheck();
        }
    }

    ngOnInit(): void {
        if ( this.name === '' ) {
            this.name = this._feedbackUtilsService.randomId();
        }
        this._feedbackNavigationService.registerComponent(this.name, this);
    }

    ngOnDestroy(): void {
        this._feedbackNavigationService.deregisterComponent(this.name);
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void {
        this._changeDetectorRef.markForCheck();
        this.onRefreshed.next(true);
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
