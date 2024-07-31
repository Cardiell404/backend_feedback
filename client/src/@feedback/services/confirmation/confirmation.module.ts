import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackConfirmationService } from '@feedback/services/confirmation/confirmation.service';
import { FeedbackConfirmationDialogComponent } from '@feedback/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        FeedbackConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        FeedbackConfirmationService
    ]
})
export class FeedbackConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _feedbackConfirmationService: FeedbackConfirmationService)
    {
    }
}
