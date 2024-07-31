import { Translation, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';

@NgModule({
    exports  : [
        TranslocoModule
    ],
    providers: [
        {
            provide : TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs      : [
                    {
                        id   : 'en',
                        label: 'English'
                    },
                    {
                        id   : 'tr',
                        label: 'Turkish'
                    }
                ],
                defaultLang         : 'en',
                fallbackLang        : 'en',
                reRenderOnLangChange: true,
                prodMode            : true
            })
        },
        {
            provide : TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            provide   : APP_INITIALIZER,
            deps      : [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);
                return translocoService.load(defaultLang).toPromise();
            },
            multi     : true
        }
    ]
})
export class TranslocoCoreModule
{
}
