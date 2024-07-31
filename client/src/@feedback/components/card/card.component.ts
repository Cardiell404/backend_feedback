import { Component, HostBinding, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { feedbackAnimations } from '@feedback/animations';
import { FeedbackCardFace } from '@feedback/components/card/card.types';

@Component({
    selector     : 'feedback-card',
    templateUrl  : './card.component.html',
    styleUrls    : ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : feedbackAnimations,
    exportAs     : 'feedbackCard'
})
export class FeedbackCardComponent implements OnChanges {
    static ngAcceptInputType_expanded: BooleanInput;
    static ngAcceptInputType_flippable: BooleanInput;

    @Input() expanded: boolean = false;
    @Input() face: FeedbackCardFace = 'front';
    @Input() flippable: boolean = false;

    constructor() {
    }

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'feedback-card-expanded'  : this.expanded,
            'feedback-card-face-back' : this.flippable && this.face === 'back',
            'feedback-card-face-front': this.flippable && this.face === 'front',
            'feedback-card-flippable' : this.flippable
        };
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if ( 'expanded' in changes ) {
            this.expanded = coerceBooleanProperty(changes.expanded.currentValue);
        }

        if ( 'flippable' in changes ) {
            this.flippable = coerceBooleanProperty(changes.flippable.currentValue);
        }
    }
}
