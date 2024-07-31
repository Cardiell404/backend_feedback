import { NgModule } from '@angular/core';
import { FeedbackScrollResetDirective } from '@feedback/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        FeedbackScrollResetDirective
    ],
    exports     : [
        FeedbackScrollResetDirective
    ]
})
export class FeedbackScrollResetModule
{
}
