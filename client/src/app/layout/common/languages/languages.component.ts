import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FeedbackNavigationService, FeedbackVerticalNavigationComponent } from '@feedback/components/navigation';

@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy {
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;


    constructor( private _changeDetectorRef: ChangeDetectorRef, private _feedbackNavigationService: FeedbackNavigationService,
        private _translocoService: TranslocoService ) {
    }    

    ngOnInit(): void {
        this.availableLangs = this._translocoService.getAvailableLangs();
        this._translocoService.langChanges$.subscribe((activeLang) => {
            this.activeLang = activeLang;
            this._updateNavigation(activeLang);
        });

        this.flagCodes = { 'en': 'us', 'tr': 'tr' };
    }

    ngOnDestroy(): void {
    }

    /**
     * Set the active lang
     *
     * @param lang
     */
    setActiveLang(lang: string): void {
        this._translocoService.setActiveLang(lang);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void {
        const navComponent = this._feedbackNavigationService.getComponent<FeedbackVerticalNavigationComponent>('mainNavigation');
        if ( !navComponent ) {
            return null;
        }

        const navigation = navComponent.navigation;
        const projectDashboardItem = this._feedbackNavigationService.getItem('dashboards.project', navigation);
        if ( projectDashboardItem ) {
            this._translocoService.selectTranslate('Project').pipe(take(1)).subscribe((translation) => {
                projectDashboardItem.title = translation;
                navComponent.refresh();
            });
        }

        const analyticsDashboardItem = this._feedbackNavigationService.getItem('dashboards.analytics', navigation);
        if ( analyticsDashboardItem ) {
            this._translocoService.selectTranslate('Analytics').pipe(take(1)).subscribe((translation) => {
                analyticsDashboardItem.title = translation;
                navComponent.refresh();
            });
        }
    }
}
