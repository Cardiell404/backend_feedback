import { animate, state, style, transition, trigger } from '@angular/animations';
import { FeedbackAnimationCurves, FeedbackAnimationDurations } from '@feedback/animations/defaults';

const zoomIn = trigger('zoomIn',
    [

        state('void',
            style({
                opacity  : 0,
                transform: 'scale(0.5)'
            })
        ),

        state('*',
            style({
                opacity  : 1,
                transform: 'scale(1)'
            })
        ),

        transition('void => false', []),

        transition('void => *', animate('{{timings}}'),
            {
                params: {
                    timings: `${FeedbackAnimationDurations.entering} ${FeedbackAnimationCurves.deceleration}`
                }
            }
        )
    ]
);

const zoomOut = trigger('zoomOut',
    [

        state('*',
            style({
                opacity  : 1,
                transform: 'scale(1)'
            })
        ),

        state('void',
            style({
                opacity  : 0,
                transform: 'scale(0.5)'
            })
        ),

        transition('false => void', []),

        transition('* => void', animate('{{timings}}'),
            {
                params: {
                    timings: `${FeedbackAnimationDurations.exiting} ${FeedbackAnimationCurves.acceleration}`
                }
            }
        )
    ]
);

export { zoomIn, zoomOut };

