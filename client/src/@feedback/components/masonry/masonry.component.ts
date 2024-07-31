import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackMediaWatcherService } from '@feedback/services/media-watcher';

@Component({
    selector     : 'feedback-masonry',
    templateUrl  : './masonry.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : feedbackAnimations,
    exportAs     : 'feedbackMasonry'
})
export class FeedbackMasonryComponent implements OnChanges, AfterViewInit
{
    @Input() columnsTemplate: TemplateRef<any>;
    @Input() columns: number;
    @Input() items: any[] = [];
    distributedColumns: any[] = [];

    constructor(private _feedbackMediaWatcherService: FeedbackMediaWatcherService) {
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'columns' in changes ) {
            this._distributeItems();
        }

        if ( 'items' in changes )  {
            this._distributeItems();
        }
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void  {
        this._distributeItems();
    }

    /**
     * Distribute items into columns
     */
    private _distributeItems(): void {
        if ( this.items.length === 0 ) {
            this.distributedColumns = [];
            return;
        }

        this.distributedColumns = Array.from(Array(this.columns), item => ({items: []}));

        for ( let i = 0; i < this.items.length; i++ ) {
            this.distributedColumns[i % this.columns].items.push(this.items[i]);
        }
    }
}
