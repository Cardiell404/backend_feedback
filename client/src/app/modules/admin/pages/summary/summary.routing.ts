import { Route } from '@angular/router';
import { SummaryBoardComponent } from './board/board.component';
import { SummaryResolver } from './summary.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: SummaryBoardComponent,
        resolve  : {
            summary: SummaryResolver,
        }
    },
];
