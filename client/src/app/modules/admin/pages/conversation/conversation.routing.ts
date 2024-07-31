import { ConversationBoardComponent } from './board/board.component';
import { Route } from '@angular/router';
import { ConversationResolver } from './conversation.resolvers';

export const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: ConversationBoardComponent,
        resolve  : {
            conversation: ConversationResolver,
        }
    },
];
