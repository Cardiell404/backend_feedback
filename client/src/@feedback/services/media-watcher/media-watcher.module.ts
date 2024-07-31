import { NgModule } from '@angular/core';
import { FeedbackMediaWatcherService } from '@feedback/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        FeedbackMediaWatcherService
    ]
})
export class FeedbackMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _feedbackMediaWatcherService: FeedbackMediaWatcherService)
    {
    }
}
