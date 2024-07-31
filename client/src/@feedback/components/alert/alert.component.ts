import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackAlertAppearance, FeedbackAlertType } from '@feedback/components/alert/alert.types';
import { FeedbackAlertService } from '@feedback/components/alert/alert.service';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';

@Component({
    selector       : 'feedback-alert',
    templateUrl    : './alert.component.html',
    styleUrls      : ['./alert.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : feedbackAnimations,
    exportAs       : 'feedbackAlert'
})
export class FeedbackAlertComponent implements OnChanges, OnInit, OnDestroy {
    static ngAcceptInputType_dismissible: BooleanInput;
    static ngAcceptInputType_dismissed: BooleanInput;
    static ngAcceptInputType_showIcon: BooleanInput;

    @Input() appearance: FeedbackAlertAppearance = 'soft';
    @Input() dismissed: boolean = false;
    @Input() dismissible: boolean = false;
    @Input() name: string = this._feedbackUtilsService.randomId();
    @Input() showIcon: boolean = true;
    @Input() type: FeedbackAlertType = 'primary';
    @Output() readonly dismissedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackAlertService: FeedbackAlertService,
        private _feedbackUtilsService: FeedbackUtilsService ) {
    }

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'feedback-alert-appearance-border' : this.appearance === 'border',
            'feedback-alert-appearance-fill'   : this.appearance === 'fill',
            'feedback-alert-appearance-outline': this.appearance === 'outline',
            'feedback-alert-appearance-soft'   : this.appearance === 'soft',
            'feedback-alert-dismissed'         : this.dismissed,
            'feedback-alert-dismissible'       : this.dismissible,
            'feedback-alert-show-icon'         : this.showIcon,
            'feedback-alert-type-primary'      : this.type === 'primary',
            'feedback-alert-type-accent'       : this.type === 'accent',
            'feedback-alert-type-warn'         : this.type === 'warn',
            'feedback-alert-type-basic'        : this.type === 'basic',
            'feedback-alert-type-info'         : this.type === 'info',
            'feedback-alert-type-success'      : this.type === 'success',
            'feedback-alert-type-warning'      : this.type === 'warning',
            'feedback-alert-type-error'        : this.type === 'error'
        };
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'dismissed' in changes ) {
            this.dismissed = coerceBooleanProperty(changes.dismissed.currentValue);
            this._toggleDismiss(this.dismissed);
        }

        if ( 'dismissible' in changes ) {
            this.dismissible = coerceBooleanProperty(changes.dismissible.currentValue);
        }

        if ( 'showIcon' in changes ) {
            this.showIcon = coerceBooleanProperty(changes.showIcon.currentValue);
        }
    }

    ngOnInit(): void {
        this._feedbackAlertService.onDismiss.pipe( filter(name => this.name === name), takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.dismiss();
        });

        this._feedbackAlertService.onShow.pipe(filter(name => this.name === name), takeUntil(this._unsubscribeAll)).subscribe(() => {
            this.show();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Dismiss the alert
     */
    dismiss(): void {
        if ( this.dismissed ) {
            return;
        }
        this._toggleDismiss(true);
    }

    /**
     * Show the dismissed alert
     */
    show(): void {
        if ( !this.dismissed ) {
            return;
        }
        this._toggleDismiss(false);
    }

    /**
     * Dismiss/show the alert
     *
     * @param dismissed
     * @private
     */
    private _toggleDismiss(dismissed: boolean): void {
        if ( !this.dismissible ) {
            return;
        }
        this.dismissed = dismissed;
        this.dismissedChanged.next(this.dismissed);
        this._changeDetectorRef.markForCheck();
    }
}
