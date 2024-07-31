import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ScrollStrategy, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { delay, filter, merge, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackNavigationItem, FeedbackVerticalNavigationAppearance, FeedbackVerticalNavigationMode, FeedbackVerticalNavigationPosition } from '@feedback/components/navigation/navigation.types';
import { FeedbackNavigationService } from '@feedback/components/navigation/navigation.service';
import { FeedbackScrollbarDirective } from '@feedback/directives/scrollbar/scrollbar.directive';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector       : 'feedback-vertical-navigation',
    templateUrl    : './vertical.component.html',
    styleUrls      : ['./vertical.component.scss'],
    animations     : feedbackAnimations,
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'feedbackVerticalNavigation'
})
export class FeedbackVerticalNavigationComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    static ngAcceptInputType_inner: BooleanInput;
    static ngAcceptInputType_opened: BooleanInput;
    static ngAcceptInputType_transparentOverlay: BooleanInput;

    @Input() appearance: FeedbackVerticalNavigationAppearance = 'default';
    @Input() autoCollapse: boolean = true;
    @Input() inner: boolean = false;
    @Input() mode: FeedbackVerticalNavigationMode = 'side';
    @Input() name: string = this._feedbackUtilsService.randomId();
    @Input() navigation: FeedbackNavigationItem[];
    @Input() opened: boolean = true;
    @Input() position: FeedbackVerticalNavigationPosition = 'left';
    @Input() transparentOverlay: boolean = false;
    @Output() readonly appearanceChanged: EventEmitter<FeedbackVerticalNavigationAppearance> = new EventEmitter<FeedbackVerticalNavigationAppearance>();
    @Output() readonly modeChanged: EventEmitter<FeedbackVerticalNavigationMode> = new EventEmitter<FeedbackVerticalNavigationMode>();
    @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() readonly positionChanged: EventEmitter<FeedbackVerticalNavigationPosition> = new EventEmitter<FeedbackVerticalNavigationPosition>();
    @ViewChild('navigationContent') private _navigationContentEl: ElementRef;

    activeAsideItemId: string | null = null;
    onCollapsableItemCollapsed: ReplaySubject<FeedbackNavigationItem> = new ReplaySubject<FeedbackNavigationItem>(1);
    onCollapsableItemExpanded: ReplaySubject<FeedbackNavigationItem> = new ReplaySubject<FeedbackNavigationItem>(1);
    onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _animationsEnabled: boolean = false;
    private _asideOverlay: HTMLElement;
    private readonly _handleAsideOverlayClick: any;
    private readonly _handleOverlayClick: any;
    private _hovered: boolean = false;
    private _mutationObserver: MutationObserver;
    private _overlay: HTMLElement;
    private _player: AnimationPlayer;
    private _scrollStrategy: ScrollStrategy = this._scrollStrategyOptions.block();
    private _feedbackScrollbarDirectives!: QueryList<FeedbackScrollbarDirective>;
    private _feedbackScrollbarDirectivesSubscription: Subscription;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _animationBuilder: AnimationBuilder, private _changeDetectorRef: ChangeDetectorRef, @Inject(DOCUMENT) private _document: Document,
        private _elementRef: ElementRef, private _renderer2: Renderer2, private _router: Router, private _scrollStrategyOptions: ScrollStrategyOptions, 
        private _feedbackNavigationService: FeedbackNavigationService, private _feedbackUtilsService: FeedbackUtilsService ) {
        this._handleAsideOverlayClick = (): void => {
            this.closeAside();
        };
        this._handleOverlayClick = (): void => {
            this.close();
        };
    }

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'feedback-vertical-navigation-animations-enabled'             : this._animationsEnabled,
            [`feedback-vertical-navigation-appearance-${this.appearance}`]: true,
            'feedback-vertical-navigation-hover'                          : this._hovered,
            'feedback-vertical-navigation-inner'                          : this.inner,
            'feedback-vertical-navigation-mode-over'                      : this.mode === 'over',
            'feedback-vertical-navigation-mode-side'                      : this.mode === 'side',
            'feedback-vertical-navigation-opened'                         : this.opened,
            'feedback-vertical-navigation-position-left'                  : this.position === 'left',
            'feedback-vertical-navigation-position-right'                 : this.position === 'right'
        };
    }

    /**
     * Host binding for component inline styles
     */
    @HostBinding('style') get styleList(): any {
        return {
            'visibility': this.opened ? 'visible' : 'hidden'
        };
    }

    /**
     * Setter for feedbackScrollbarDirectives
     */
    @ViewChildren(FeedbackScrollbarDirective)
    set feedbackScrollbarDirectives(feedbackScrollbarDirectives: QueryList<FeedbackScrollbarDirective>) {
        this._feedbackScrollbarDirectives = feedbackScrollbarDirectives;
        if ( feedbackScrollbarDirectives.length === 0 ) {
            return;
        }

        if ( this._feedbackScrollbarDirectivesSubscription ) {
            this._feedbackScrollbarDirectivesSubscription.unsubscribe();
        }

        this._feedbackScrollbarDirectivesSubscription =
            merge( this.onCollapsableItemCollapsed, this.onCollapsableItemExpanded ).pipe( takeUntil(this._unsubscribeAll), delay(250) ).subscribe(() => {
                feedbackScrollbarDirectives.forEach((feedbackScrollbarDirective) => {
                    feedbackScrollbarDirective.update();
                });
            });
    }

    /**
     * On mouseenter
     *
     * @private
     */
    @HostListener('mouseenter')
    private _onMouseenter(): void {
        this._enableAnimations();
        this._hovered = true;
    }

    /**
     * On mouseleave
     *
     * @private
     */
    @HostListener('mouseleave')
    private _onMouseleave(): void {
        this._enableAnimations();
        this._hovered = false;
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'appearance' in changes ) {
            this.appearanceChanged.next(changes.appearance.currentValue);
        }

        if ( 'inner' in changes ) {
            this.inner = coerceBooleanProperty(changes.inner.currentValue);
        }

        if ( 'mode' in changes ) {
            const currentMode = changes.mode.currentValue;
            const previousMode = changes.mode.previousValue;

            this._disableAnimations();
            if ( previousMode === 'over' && currentMode === 'side' ) {
                this._hideOverlay();
            }

            if ( previousMode === 'side' && currentMode === 'over' ) {
                this.closeAside();
                if ( this.opened ) {
                    this._showOverlay();
                }
            }
            this.modeChanged.next(currentMode);
            setTimeout(() => { this._enableAnimations(); }, 500);
        }

        if ( 'navigation' in changes ) {
            this._changeDetectorRef.markForCheck();
        }

        if ( 'opened' in changes ) {
            this.opened = coerceBooleanProperty(changes.opened.currentValue);
            this._toggleOpened(this.opened);
        }

        if ( 'position' in changes ) {
            this.positionChanged.next(changes.position.currentValue);
        }

        if ( 'transparentOverlay' in changes ) {
            this.transparentOverlay = coerceBooleanProperty(changes.transparentOverlay.currentValue);
        }
    }

    ngOnInit(): void {
        if ( this.name === '' ) {
            this.name = this._feedbackUtilsService.randomId();
        }

        this._feedbackNavigationService.registerComponent(this.name, this);
        this._router.events.pipe( filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll) ).subscribe(() => {
            if ( this.mode === 'over' && this.opened ) {
                this.close();
            }

            if ( this.mode === 'side' && this.activeAsideItemId ) {
                this.closeAside();
            }
        });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this._mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const mutationTarget = mutation.target as HTMLElement;
                if ( mutation.attributeName === 'class' ) {
                    if ( mutationTarget.classList.contains('cdk-global-scrollblock') ) {
                        const top = parseInt(mutationTarget.style.top, 10);
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', `${Math.abs(top)}px`);
                    } else {
                        this._renderer2.setStyle(this._elementRef.nativeElement, 'margin-top', null);
                    }
                }
            });
        });
        this._mutationObserver.observe(this._document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setTimeout(() => {
            if ( !this._navigationContentEl ) {
                return;
            }

            if ( !this._navigationContentEl.nativeElement.classList.contains('ps') ) {
                const activeItem = this._navigationContentEl.nativeElement.querySelector('.feedback-vertical-navigation-item-active');
                if ( activeItem ) {
                    activeItem.scrollIntoView();
                }
            } else {
                this._feedbackScrollbarDirectives.forEach((feedbackScrollbarDirective) => {
                    if ( !feedbackScrollbarDirective.isEnabled() ) {
                        return;
                    }
                    feedbackScrollbarDirective.scrollToElement('.feedback-vertical-navigation-item-active', -120, true);
                });
            }
        });
    }

    ngOnDestroy(): void {
        this._mutationObserver.disconnect();
        this.close();
        this.closeAside();
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
     * Open the navigation
     */
    open(): void {
        if ( this.opened ) {
            return;
        }
        this._toggleOpened(true);
    }

    /**
     * Close the navigation
     */
    close(): void {
        if ( !this.opened ) {
            return;
        }

        this.closeAside();
        this._toggleOpened(false);
    }

    /**
     * Toggle the navigation
     */
    toggle(): void {
        if ( this.opened ) {
            this.close();
        } else {
            this.open();
        }
    }

    /**
     * Open the aside
     *
     * @param item
     */
    openAside(item: FeedbackNavigationItem): void {
        if ( item.disabled || !item.id ) {
            return;
        }
        this.activeAsideItemId = item.id;
        this._showAsideOverlay();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Close the aside
     */
    closeAside(): void {
        this.activeAsideItemId = null;
        this._hideAsideOverlay();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the aside
     *
     * @param item
     */
    toggleAside(item: FeedbackNavigationItem): void {
        if ( this.activeAsideItemId === item.id ) {
            this.closeAside();
        } else {
            this.openAside(item);
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
     * Enable the animations
     *
     * @private
     */
    private _enableAnimations(): void {
        if ( this._animationsEnabled ) {
            return;
        }
        this._animationsEnabled = true;
    }

    /**
     * Disable the animations
     *
     * @private
     */
    private _disableAnimations(): void {
        if ( !this._animationsEnabled ) {
            return;
        }
        this._animationsEnabled = false;
    }

    /**
     * Show the overlay
     *
     * @private
     */
    private _showOverlay(): void {
        if ( this._asideOverlay )  {
            return;
        }
        this._overlay = this._renderer2.createElement('div');
        this._overlay.classList.add('feedback-vertical-navigation-overlay');
        if ( this.transparentOverlay ) {
            this._overlay.classList.add('feedback-vertical-navigation-overlay-transparent');
        }
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);
        this._scrollStrategy.enable();
        this._player = this._animationBuilder.build([animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))]).create(this._overlay);
        this._player.play();
        this._overlay.addEventListener('click', this._handleOverlayClick);
    }

    /**
     * Hide the overlay
     *
     * @private
     */
    private _hideOverlay(): void {
        if ( !this._overlay ) {
            return;
        }

        this._player = this._animationBuilder.build([ animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0})) ]).create(this._overlay);
        this._player.play();
        this._player.onDone(() => {
            if ( this._overlay ) {
                this._overlay.removeEventListener('click', this._handleOverlayClick);
                this._overlay.parentNode.removeChild(this._overlay);
                this._overlay = null;
            }
            this._scrollStrategy.disable();
        });
    }

    /**
     * Show the aside overlay
     *
     * @private
     */
    private _showAsideOverlay(): void {
        if ( this._asideOverlay ) {
            return;
        }
        this._asideOverlay = this._renderer2.createElement('div');
        this._asideOverlay.classList.add('feedback-vertical-navigation-aside-overlay');
        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._asideOverlay);
        this._player = this._animationBuilder.build([ animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))]).create(this._asideOverlay);
        this._player.play();
        this._asideOverlay.addEventListener('click', this._handleAsideOverlayClick);
    }

    /**
     * Hide the aside overlay
     *
     * @private
     */
    private _hideAsideOverlay(): void {
        if ( !this._asideOverlay ) {
            return;
        }

        this._player = this._animationBuilder.build([ animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0}))]).create(this._asideOverlay);
        this._player.play();
        this._player.onDone(() => {
            if ( this._asideOverlay ) {
                this._asideOverlay.removeEventListener('click', this._handleAsideOverlayClick);
                this._asideOverlay.parentNode.removeChild(this._asideOverlay);
                this._asideOverlay = null;
            }
        });
    }

    /**
     * Open/close the navigation
     *
     * @param open
     * @private
     */
    private _toggleOpened(open: boolean): void {
        this.opened = open;
        this._enableAnimations();
        if ( this.mode === 'over' ) {
            if ( this.opened ) {
                this._showOverlay();
            } else {
                this._hideOverlay();
            }
        }
        this.openedChanged.next(open);
    }
}
