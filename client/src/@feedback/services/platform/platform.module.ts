import { NgModule } from '@angular/core';
import { FeedbackPlatformService } from '@feedback/services/platform/platform.service';

@NgModule({
    providers: [
        FeedbackPlatformService
    ]
})
export class FeedbackPlatformModule {
    constructor(private _feedbackPlatformService: FeedbackPlatformService) {
    }
}
