import { Component, Inject, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, filter, map, Subject, takeUntil } from 'rxjs';
import { FeedbackConfigService } from '@feedback/services/config';
import { FeedbackMediaWatcherService } from '@feedback/services/media-watcher';
import { FeedbackPlatformService } from '@feedback/services/platform';
import { FEEDBACK_VERSION } from '@feedback/version';
import { Layout } from 'app/layout/layout.types';
import { AppConfig } from 'app/core/config/app.config';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, OnDestroy {
    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _activatedRoute: ActivatedRoute, @Inject(DOCUMENT) private _document: any, private _renderer2: Renderer2,
        private _router: Router, private _feedbackConfigService: FeedbackConfigService, private _feedbackMediaWatcherService: FeedbackMediaWatcherService,
        private _feedbackPlatformService: FeedbackPlatformService) {
    }

    ngOnInit(): void {
        combineLatest([
            this._feedbackConfigService.config$,
            this._feedbackMediaWatcherService.onMediaQueryChange$(['(prefers-color-scheme: dark)', '(prefers-color-scheme: light)'])
        ]).pipe( takeUntil(this._unsubscribeAll),
            map(([config, mql]) => {
                const options = {
                    scheme: config.scheme,
                    theme : config.theme
                };

                if ( config.scheme === 'auto' ) {
                    options.scheme = mql.breakpoints['(prefers-color-scheme: dark)'] ? 'dark' : 'light';
                }
                return options;
            })
        ).subscribe((options) => {

            this.scheme = options.scheme;
            this.theme = options.theme;

            this._updateScheme();
            this._updateTheme();
        });

        this._feedbackConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.config = config;
            this._updateLayout();
        });

        this._router.events.pipe( filter(event => event instanceof NavigationEnd),
            takeUntil(this._unsubscribeAll)).subscribe(() => {
            this._updateLayout();
        });

        this._renderer2.setAttribute(this._document.querySelector('[ng-version]'), 'feedback-version', FEEDBACK_VERSION);
        this._renderer2.addClass(this._document.body, this._feedbackPlatformService.osName);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * Update the selected layout
     */
    private _updateLayout(): void {
        let route = this._activatedRoute;
        while ( route.firstChild ) {
            route = route.firstChild;
        }

        this.layout = this.config.layout;
        const layoutFromQueryParam = (route.snapshot.queryParamMap.get('layout') as Layout);
        if ( layoutFromQueryParam ) {
            this.layout = layoutFromQueryParam;
            if ( this.config ) {
                this.config.layout = layoutFromQueryParam;
            }
        }

        const paths = route.pathFromRoot;
        paths.forEach((path) => {
            if ( path.routeConfig && path.routeConfig.data && path.routeConfig.data.layout ) {
                this.layout = path.routeConfig.data.layout;
            }
        });
    }

    /**
     * Update the selected scheme
     *
     * @private
     */
    private _updateScheme(): void {
        this._document.body.classList.remove('light', 'dark');
        this._document.body.classList.add(this.scheme);
    }

    /**
     * Update the selected theme
     *
     * @private
     */
    private _updateTheme(): void {
        this._document.body.classList.forEach((className: string) => {
            if ( className.startsWith('theme-') ) {
                this._document.body.classList.remove(className, className.split('-')[1]);
            }
        });
        this._document.body.classList.add(this.theme);
    }
}
