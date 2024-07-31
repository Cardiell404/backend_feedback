import { NgModule } from '@angular/core';
import { FeedbackFindByKeyPipe } from '@feedback/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        FeedbackFindByKeyPipe
    ],
    exports     : [
        FeedbackFindByKeyPipe
    ]
})
export class FeedbackFindByKeyPipeModule
{
}
