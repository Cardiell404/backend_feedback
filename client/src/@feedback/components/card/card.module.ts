import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCardComponent } from '@feedback/components/card/card.component';

@NgModule({
    declarations: [
        FeedbackCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FeedbackCardComponent
    ]
})
export class FeedbackCardModule
{
}
