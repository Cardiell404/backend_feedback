import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackMasonryComponent } from '@feedback/components/masonry/masonry.component';

@NgModule({
    declarations: [
        FeedbackMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FeedbackMasonryComponent
    ]
})
export class FeedbackMasonryModule
{
}
