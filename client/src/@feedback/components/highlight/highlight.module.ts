import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackHighlightComponent } from '@feedback/components/highlight/highlight.component';

@NgModule({
    declarations: [
        FeedbackHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FeedbackHighlightComponent
    ]
})
export class FeedbackHighlightModule
{
}
