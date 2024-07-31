import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { filter, Subject, takeUntil } from 'rxjs';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Component({
    selector       : 'feedback-vertical-navigation-aside-item',
    templateUrl    : './aside.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackVerticalNavigationAsideItemComponent implements OnChanges, OnInit, OnDestroy {
    static ngAcceptInputType_autoCollapse: BooleanInput;
    static ngAcceptInputType_skipChildren: BooleanInput;

    @Input() activeItemId: string;
    @Input() autoCollapse: boolean;
    @Input() item: FeedbackNavigationItem;
    @Input() name: string;
    @Input() skipChildren: boolean;

    active: boolean = false;
    private _feedbackVerticalNavigationComponent: FeedbackVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _router: Router, private _feedbackNavigationService: FeedbackNavigationService ) {
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'activeItemId' in changes ) {
            this._markIfActive(this._router.url);
        }
    }

    ngOnInit(): void {
        this._markIfActive(this._router.url);
        this._router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll) ).subscribe((event: NavigationEnd) => {
            this._markIfActive(event.urlAfterRedirects);
        });

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

    /**
     * Check if the given item has the given url
     * in one of its children
     *
     * @param item
     * @param currentUrl
     * @private
     */
    private _hasActiveChild(item: FeedbackNavigationItem, currentUrl: string): boolean {
        const children = item.children;

        if ( !children ) {
            return false;
        }

        for ( const child of children )  {
            if ( child.children ) {
                if ( this._hasActiveChild(child, currentUrl) ) {
                    return true;
                }
            }

            if ( child.type !== 'basic' )  {
                continue;
            }

            if ( child.link && this._router.isActive(child.link, child.exactMatch || false) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Decide and mark if the item is active
     *
     * @private
     */
    private _markIfActive(currentUrl: string): void {
        this.active = this.activeItemId === this.item.id;
        if ( this._hasActiveChild(this.item, currentUrl) ) {
            this.active = true;
        }
        this._changeDetectorRef.markForCheck();
    }
}
