import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FeedbackAlertComponent } from '@feedback/components/alert/alert.component';

@NgModule({
    declarations: [
        FeedbackAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        FeedbackAlertComponent
    ]
})
export class FeedbackAlertModule
{
}
