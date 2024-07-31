import { GoalBoardComponent } from './board/board.component';
import { Route } from '@angular/router';
import { GoalResolver } from './goal.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: GoalBoardComponent,
        resolve  : {
            goals: GoalResolver,
        }
    },
];
