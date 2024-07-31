import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeedbackLoadingBarComponent } from '@feedback/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        FeedbackLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        FeedbackLoadingBarComponent
    ]
})
export class FeedbackLoadingBarModule
{
}
