import { NgModule } from '@angular/core';
import { FeedbackScrollbarDirective } from '@feedback/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        FeedbackScrollbarDirective
    ],
    exports     : [
        FeedbackScrollbarDirective
    ]
})
export class FeedbackScrollbarModule
{
}
