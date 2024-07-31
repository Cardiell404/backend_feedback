import { Route } from '@angular/router';
import { DashboardBoardResolver, UniversalCardResolver } from 'app/modules/admin/pages/dashboard/dashboard.resolvers';
import { DashboardBoardComponent } from 'app/modules/admin/pages/dashboard/board/board.component';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: DashboardBoardComponent,
        resolve  : {
            board: DashboardBoardResolver,
            universalCards: UniversalCardResolver,
        }
    },
];
