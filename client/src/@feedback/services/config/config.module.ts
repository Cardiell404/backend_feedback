import { ModuleWithProviders, NgModule } from '@angular/core';
import { FeedbackConfigService } from '@feedback/services/config/config.service';
import { FEEDBACK_APP_CONFIG } from '@feedback/services/config/config.constants';

@NgModule()
export class FeedbackConfigModule
{
    /**
     * Constructor
     */
    constructor(private _feedbackConfigService: FeedbackConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<FeedbackConfigModule>
    {
        return {
            ngModule : FeedbackConfigModule,
            providers: [
                {
                    provide : FEEDBACK_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
