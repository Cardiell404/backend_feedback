import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Conversation } from '../conversation.models';
import { ConversationService } from '../conversation.service';
import { NewConversationComponent } from './new-conversation/new-conversation.component';

@Component({
    selector       : 'conversation-board',
    templateUrl    : './board.component.html',
    styleUrls      : ['./board.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationBoardComponent implements OnInit, OnDestroy {
    conversations: Conversation[] = [];
    page: number = 1;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor( private _matDialog: MatDialog, private _changeDetectorRef: ChangeDetectorRef, private _conversationService: ConversationService, ) {
    }


    ngOnInit(): void {
        this._conversationService.conversations$.pipe(takeUntil(this._unsubscribeAll)).subscribe((conversations: Conversation[]) => {
            this.conversations.push(...conversations);
            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    /**
     * 
     * Add Conversation
     */
    addConversation() {
        this._matDialog.open(NewConversationComponent, { autoFocus: false,
            maxWidth: '100vw',
            maxHeight: '100vw',
            width: '95vw',
            height: '95vh',
            data     : {
                note: {}
            }
        });
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
    onScroll() {
        this._conversationService.searchConversations(++this.page).subscribe();
    }
}
