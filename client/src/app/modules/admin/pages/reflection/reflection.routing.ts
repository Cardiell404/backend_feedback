import { Route } from '@angular/router';
import { ReflectionBoardComponent } from './board/board.component';
import { ReflectionResolver } from './reflection.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: ReflectionBoardComponent,
        resolve  : {
            reflections: ReflectionResolver,
        }
    },
];
