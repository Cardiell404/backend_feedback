import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { filter, Subject, takeUntil } from 'rxjs';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackVerticalNavigationComponent } from '@feedback/components/navigation/vertical/vertical.component';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackNavigationItem } from '@feedback/components/navigation/navigation.types';

@Component({
    selector       : 'feedback-vertical-navigation-collapsable-item',
    templateUrl    : './collapsable.component.html',
    animations     : feedbackAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedbackVerticalNavigationCollapsableItemComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_autoCollapse: BooleanInput;

    @Input() autoCollapse: boolean;
    @Input() item: FeedbackNavigationItem;
    @Input() name: string;

    isCollapsed: boolean = true;
    isExpanded: boolean = false;
    private _feedbackVerticalNavigationComponent: FeedbackVerticalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _router: Router, private _feedbackNavigationService: FeedbackNavigationService ) {
    }

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'feedback-vertical-navigation-item-collapsed': this.isCollapsed,
            'feedback-vertical-navigation-item-expanded' : this.isExpanded
        };
    }

    ngOnInit(): void {
        this._feedbackVerticalNavigationComponent = this._feedbackNavigationService.getComponent(this.name);
        if ( this._hasActiveChild(this.item, this._router.url) ) {
            this.expand();
        } else {
            if ( this.autoCollapse ) {
                this.collapse();
            }
        }

        this._feedbackVerticalNavigationComponent.onCollapsableItemCollapsed.pipe(takeUntil(this._unsubscribeAll)).subscribe((collapsedItem) => {
                if ( collapsedItem === null ) {
                    return;
                }

                if ( this._isChildrenOf(collapsedItem, this.item) ) {
                    this.collapse();
                }
            });

        if ( this.autoCollapse ) {
            this._feedbackVerticalNavigationComponent.onCollapsableItemExpanded.pipe(takeUntil(this._unsubscribeAll)).subscribe((expandedItem) => {
                if ( expandedItem === null ) {
                    return;
                }

                if ( this._isChildrenOf(this.item, expandedItem) ) {
                    return;
                }

                if ( this._hasActiveChild(this.item, this._router.url) ) {
                    return;
                }

                if ( this.item === expandedItem ) {
                    return;
                }

                this.collapse();
            });
        }

        this._router.events.pipe( filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll)).subscribe((event: NavigationEnd) => {
            if ( this._hasActiveChild(this.item, event.urlAfterRedirects) ) {
                this.expand();
            } else {
                if ( this.autoCollapse ) {
                    this.collapse();
                }
            }
        });

        this._feedbackVerticalNavigationComponent.onRefreshed.pipe( takeUntil(this._unsubscribeAll) ).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Collapse
     */
    collapse(): void {
        if ( this.item.disabled ) {
            return;
        }

        if ( this.isCollapsed ) {
            return;
        }

        this.isCollapsed = true;
        this.isExpanded = !this.isCollapsed;
        this._changeDetectorRef.markForCheck();
        this._feedbackVerticalNavigationComponent.onCollapsableItemCollapsed.next(this.item);
    }

    /**
     * Expand
     */
    expand(): void {
        if ( this.item.disabled ) {
            return;
        }

        if ( !this.isCollapsed ) {
            return;
        }

        this.isCollapsed = false;
        this.isExpanded = !this.isCollapsed;
        this._changeDetectorRef.markForCheck();
        this._feedbackVerticalNavigationComponent.onCollapsableItemExpanded.next(this.item);
    }

    /**
     * Toggle collapsable
     */
    toggleCollapsable(): void {
        if ( this.isCollapsed ) {
            this.expand();
        } else {
            this.collapse();
        }
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

        for ( const child of children ) {
            if ( child.children ) {
                if ( this._hasActiveChild(child, currentUrl) ) {
                    return true;
                }
            }
            if ( child.link && this._router.isActive(child.link, child.exactMatch || false) ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Check if this is a children
     * of the given item
     *
     * @param parent
     * @param item
     * @private
     */
    private _isChildrenOf(parent: FeedbackNavigationItem, item: FeedbackNavigationItem): boolean {
        const children = parent.children;

        if ( !children ) {
            return false;
        }

        if ( children.indexOf(item) > -1 ) {
            return true;
        }

        for ( const child of children ) {
            if ( child.children ) {
                if ( this._isChildrenOf(child, item) ) {
                    return true;
                }
            }
        }
        return false;
    }
}
