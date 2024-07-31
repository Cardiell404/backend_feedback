import { FeedbackBoardComponent } from './board/board.component';
import { Route } from '@angular/router';
import { FeedbackResolver } from './feedback.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: FeedbackBoardComponent,
        resolve  : {
            feedback: FeedbackResolver,
        }
    },
];
