import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { FeedbackDrawerMode, FeedbackDrawerPosition } from '@feedback/components/drawer/drawer.types';
import { FeedbackDrawerService } from '@feedback/components/drawer/drawer.service';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector     : 'feedback-drawer',
    templateUrl  : './drawer.component.html',
    styleUrls    : ['./drawer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'feedbackDrawer'
})
export class FeedbackDrawerComponent implements OnChanges, OnInit, OnDestroy {
    static ngAcceptInputType_fixed: BooleanInput;
    static ngAcceptInputType_opened: BooleanInput;
    static ngAcceptInputType_transparentOverlay: BooleanInput;

    @Input() fixed: boolean = false;
    @Input() mode: FeedbackDrawerMode = 'side';
    @Input() name: string = this._feedbackUtilsService.randomId();
    @Input() opened: boolean = false;
    @Input() position: FeedbackDrawerPosition = 'left';
    @Input() transparentOverlay: boolean = false;
    @Output() readonly fixedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() readonly modeChanged: EventEmitter<FeedbackDrawerMode> = new EventEmitter<FeedbackDrawerMode>();
    @Output() readonly openedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() readonly positionChanged: EventEmitter<FeedbackDrawerPosition> = new EventEmitter<FeedbackDrawerPosition>();

    private _animationsEnabled: boolean = false;
    private readonly _handleOverlayClick: any;
    private _hovered: boolean = false;
    private _overlay: HTMLElement;
    private _player: AnimationPlayer;


    constructor( private _animationBuilder: AnimationBuilder, private _elementRef: ElementRef, private _renderer2: Renderer2,
        private _feedbackDrawerService: FeedbackDrawerService, private _feedbackUtilsService: FeedbackUtilsService ) {
        this._handleOverlayClick = (): void => {
            this.close();
        };
    }

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'feedback-drawer-animations-enabled'         : this._animationsEnabled,
            'feedback-drawer-fixed'                      : this.fixed,
            'feedback-drawer-hover'                      : this._hovered,
            [`feedback-drawer-mode-${this.mode}`]        : true,
            'feedback-drawer-opened'                     : this.opened,
            [`feedback-drawer-position-${this.position}`]: true
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
        if ( 'fixed' in changes ) {
            this.fixed = coerceBooleanProperty(changes.fixed.currentValue);
            this.fixedChanged.next(this.fixed);
        }

        if ( 'mode' in changes ) {
            const previousMode = changes.mode.previousValue;
            const currentMode = changes.mode.currentValue;
            this._disableAnimations();
            if ( previousMode === 'over' && currentMode === 'side' ) {
                this._hideOverlay();
            }

            if ( previousMode === 'side' && currentMode === 'over' ) {
                if ( this.opened ) {
                    this._showOverlay();
                }
            }
            this.modeChanged.next(currentMode);

            setTimeout(() => {
                this._enableAnimations();
            }, 500);
        }

        if ( 'opened' in changes ) {
            const open = coerceBooleanProperty(changes.opened.currentValue);
            this._toggleOpened(open);
        }

        if ( 'position' in changes ) {
            this.positionChanged.next(this.position);
        }

        if ( 'transparentOverlay' in changes ) {
            this.transparentOverlay = coerceBooleanProperty(changes.transparentOverlay.currentValue);
        }
    }

    ngOnInit(): void  {
        this._feedbackDrawerService.registerComponent(this.name, this);
    }

    ngOnDestroy(): void {
        if ( this._player ) {
            this._player.finish();
        }
        this._feedbackDrawerService.deregisterComponent(this.name);
    }

    /**
     * Open the drawer
     */
    open(): void {
        if ( this.opened ) {
            return;
        }
        this._toggleOpened(true);
    }

    /**
     * Close the drawer
     */
    close(): void {
        if ( !this.opened ) {
            return;
        }
        this._toggleOpened(false);
    }

    /**
     * Toggle the drawer
     */
    toggle(): void {
        if ( this.opened ) {
            this.close();
        } else {
            this.open();
        }
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
     * Show the backdrop
     *
     * @private
     */
    private _showOverlay(): void {
        this._overlay = this._renderer2.createElement('div');

        this._overlay.classList.add('feedback-drawer-overlay');

        if ( this.fixed ) {
            this._overlay.classList.add('feedback-drawer-overlay-fixed');
        }

        if ( this.transparentOverlay ) {
            this._overlay.classList.add('feedback-drawer-overlay-transparent');
        }

        this._renderer2.appendChild(this._elementRef.nativeElement.parentElement, this._overlay);

        this._player = this._animationBuilder.build([
            style({opacity: 0}),
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 1}))
        ]).create(this._overlay);

        this._player.play();
        this._overlay.addEventListener('click', this._handleOverlayClick);
    }

    /**
     * Hide the backdrop
     *
     * @private
     */
    private _hideOverlay(): void {
        if ( !this._overlay ) {
            return;
        }

        this._player = this._animationBuilder.build([
            animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({opacity: 0}))
        ]).create(this._overlay);

        this._player.play();

        this._player.onDone(() => {
            if ( this._overlay ) {
                this._overlay.removeEventListener('click', this._handleOverlayClick);
                this._overlay.parentNode.removeChild(this._overlay);
                this._overlay = null;
            }
        });
    }

    /**
     * Open/close the drawer
     *
     * @param open
     * @private
     */
    private _toggleOpened(open: boolean): void {
        this.opened = open;
        this._enableAnimations();
        if ( this.mode === 'over' ) {
            if ( open ) {
                this._showOverlay();
            } else {
                this._hideOverlay();
            }
        }
        this.openedChanged.next(open);
    }
}
