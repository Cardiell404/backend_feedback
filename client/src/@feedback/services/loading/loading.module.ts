import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FeedbackLoadingInterceptor } from '@feedback/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: FeedbackLoadingInterceptor,
            multi   : true
        }
    ]
})
export class FeedbackLoadingModule
{
}
