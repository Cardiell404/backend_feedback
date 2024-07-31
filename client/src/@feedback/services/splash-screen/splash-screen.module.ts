import { NgModule } from '@angular/core';
import { FeedbackSplashScreenService } from '@feedback/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        FeedbackSplashScreenService
    ]
})
export class FeedbackSplashScreenModule {

    constructor(private _feedbackSplashScreenService: FeedbackSplashScreenService) {
    }
}
