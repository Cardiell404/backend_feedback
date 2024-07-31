import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { FeedbackConfirmationDialogComponent } from '@feedback/services/confirmation/dialog/dialog.component';
import { FeedbackConfirmationConfig } from '@feedback/services/confirmation/confirmation.types';

@Injectable()
export class FeedbackConfirmationService {
    private _defaultConfig: FeedbackConfirmationConfig = {
        title      : 'Confirm action',
        message    : 'Are you sure you want to confirm this action?',
        icon       : {
            show : true,
            name : 'heroicons_outline:exclamation',
            color: 'warn'
        },
        actions    : {
            confirm: {
                show : true,
                label: 'Confirm',
                color: 'warn'
            },
            cancel : {
                show : true,
                label: 'Cancel'
            }
        },
        dismissible: false
    };

    constructor( private _matDialog: MatDialog ) {
    }

    open(config: FeedbackConfirmationConfig = {}): MatDialogRef<FeedbackConfirmationDialogComponent> {
        const userConfig = merge({}, this._defaultConfig, config);
        return this._matDialog.open(FeedbackConfirmationDialogComponent, {
            autoFocus   : false,
            disableClose: !userConfig.dismissible,
            data        : userConfig,
            panelClass  : 'feedback-confirmation-dialog-panel'
        });
    }
}
