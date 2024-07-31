import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackDrawerComponent } from '@feedback/components/drawer/drawer.component';

@NgModule({
    declarations: [
        FeedbackDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        FeedbackDrawerComponent
    ]
})
export class FeedbackDrawerModule
{
}
