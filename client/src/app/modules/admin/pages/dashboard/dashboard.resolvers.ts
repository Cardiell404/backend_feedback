import { UniversalCard } from './dashboard.models';
import { ConversationService } from './../conversation/conversation.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { Board, Card, Member } from 'app/modules/admin/pages/dashboard/dashboard.models';
import { DashboardService } from 'app/modules/admin/pages/dashboard/dashboard.service';
import { GoalService } from '../goal/goal.service';
import { FeedbackService } from '../feedback/feedback.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardBoardResolver implements Resolve<any> {

    constructor( private _dashboardService: DashboardService, private _goalService: GoalService,
                 private _conversationService: ConversationService, private _feedbackService: FeedbackService ) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Board[]> {
        return forkJoin([
            this._dashboardService.getBoards(),
            this._feedbackService.getFeedback(),
            this._conversationService.getConversations(),
            this._goalService.getGoals(),
        ]).pipe(map(([boards, feedback, conversations, goals])=> {
            boards[0].cards = feedback.map(feedback => new Card({id: feedback.id, title: feedback.title, description: feedback.description, dueDate: feedback.createDate, members: feedback.responses}));
            boards[1].cards = conversations.length > 0 ? conversations.map(conversation => new Card({id: conversation.id, title: conversation.title, description: conversation.description, dueDate: conversation.createDate})) : [new Card({id: '-1', title: 'Connect with others through Checkpoint', description: 'Wheter its creating a future of hybrid cloud and AI, or being the backbone of fome of m', dueDate: 'Aug 5, 2021', members: [new Member({name: 'Checkpoint', lastName: ''})]})];
            boards[2].cards = goals.map(goal => new Card({id: goal.id, title: goal.title, description: goal.description, dueDate: goal.dueDate}));
            return boards;
        }));
    }
}

@Injectable({
    providedIn: 'root'
})
export class UniversalCardResolver implements Resolve<any> {

    constructor( private _dashboardService: DashboardService) {
    }


    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UniversalCard[]> {
        return this._dashboardService.getUniversalCards();
    }
}
