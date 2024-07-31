import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EmbeddedViewRef, Input, OnChanges, Renderer2, SecurityContext, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FeedbackHighlightService } from '@feedback/components/highlight/highlight.service';

@Component({
    selector       : 'textarea[feedback-highlight]',
    templateUrl    : './highlight.component.html',
    styleUrls      : ['./highlight.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'feedbackHighlight'
})
export class FeedbackHighlightComponent implements OnChanges, AfterViewInit
{
    @Input() code: string;
    @Input() lang: string;
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    highlightedCode: string;
    private _viewRef: EmbeddedViewRef<any>;

    constructor( private _changeDetectorRef: ChangeDetectorRef, private _domSanitizer: DomSanitizer, private _elementRef: ElementRef,
        private _renderer2: Renderer2, private _feedbackHighlightService: FeedbackHighlightService, private _viewContainerRef: ViewContainerRef ) {
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'code' in changes || 'lang' in changes ) {
            if ( !this._viewContainerRef.length ) {
                return;
            }
            this._highlightAndInsert();
        }
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if ( !this.lang ) {
            return;
        }

        if ( !this.code ) {
            this.code = this._elementRef.nativeElement.value;
        }
        this._highlightAndInsert();
    }

    /**
     * Highlight and insert the highlighted code
     *
     * @private
     */
    private _highlightAndInsert(): void {
        if ( !this.templateRef ) {
            return;
        }

        if ( !this.code || !this.lang ) {
            return;
        }

        if ( this._viewRef ) {
            this._viewRef.destroy();
            this._viewRef = null;
        }

        this.highlightedCode = this._domSanitizer.sanitize(SecurityContext.HTML, this._feedbackHighlightService.highlight(this.code, this.lang));
        if ( this.highlightedCode === null ) {
            return;
        }

        this._viewRef = this._viewContainerRef.createEmbeddedView(this.templateRef, {
            highlightedCode: this.highlightedCode,
            lang           : this.lang
        });

        this._viewRef.detectChanges();
    }
}
