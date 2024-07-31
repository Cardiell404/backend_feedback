import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FeedbackConfirmationModule } from '@feedback/services/confirmation';
import { FeedbackLoadingModule } from '@feedback/services/loading';
import { FeedbackMediaWatcherModule } from '@feedback/services/media-watcher/media-watcher.module';
import { FeedbackPlatformModule } from '@feedback/services/platform/platform.module';
import { FeedbackSplashScreenModule } from '@feedback/services/splash-screen/splash-screen.module';
import { FeedbackUtilsModule } from '@feedback/services/utils/utils.module';

@NgModule({
    imports  : [
        FeedbackConfirmationModule,
        FeedbackLoadingModule,
        FeedbackMediaWatcherModule,
        FeedbackPlatformModule,
        FeedbackSplashScreenModule,
        FeedbackUtilsModule
    ],
    providers: [
        {
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class FeedbackModule {
    constructor(@Optional() @SkipSelf() parentModule?: FeedbackModule) {
        if ( parentModule ) {
            throw new Error('FeedbackModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
