import { NgModule } from '@angular/core';
import { FeedbackUtilsService } from '@feedback/services/utils/utils.service';

@NgModule({
    providers: [
        FeedbackUtilsService
    ]
})
export class FeedbackUtilsModule {
    constructor(private _feedbackUtilsService: FeedbackUtilsService) {
    }
}
