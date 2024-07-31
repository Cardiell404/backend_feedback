import { IBoard, ICard, IMember, IUniversalCard } from 'app/modules/admin/pages/dashboard/dashboard.types';
export class Board implements Required<IBoard> {
    id: string;
    title: string;
    subtitle: string;
    actionName: string;
    color: string;
    icon: string;
    cards: Card[];

    constructor(board: IBoard) {
        this.id          = board.id;
        this.title       = board.title;
        this.subtitle    = board.subtitle;
        this.color       = board.color;
        this.icon        = board.icon;
        this.actionName  = board.actionName;
        this.cards       = [];
        if ( board.cards ) {
            this.cards = board.cards.map((card) => {
                if ( !(card instanceof Card) ) {
                    return new Card(card);
                }
                return card;
            });
        }
    }
}

export class Card implements Required<ICard> {
    id: string;
    title: string;
    description: string | null;
    members: Member[];
    dueDate: string | null;

    constructor(card: ICard) {
        this.id          = card.id;
        this.title       = card.title;
        this.description = card.description || null;
        this.members     = [];
        this.dueDate     = card.dueDate || null;
        if ( card.members ) {
            this.members = card.members.map((member) => {
                if ( !(member instanceof Member) ) {
                    return new Member(member);
                }
                return member;
            });
        }
    }
}

export class Member implements Required<IMember> {
    name: string;
    lastName: string;
    avatar: string | null;

    constructor(member: IMember) {
        this.name = member.name;
        this.lastName = member.lastName;
        this.avatar = member.avatar || null;
    }
}

export class UniversalCard implements Required<IUniversalCard> {
    icon: string;
    title: string;
    description: string;
    link: string;
    color: string;

    constructor(universalCard: UniversalCard) {
        this.title       = universalCard.title;
        this.description = universalCard.description;
        this.link        = universalCard.link;
        this.icon        = universalCard.icon;
        this.color       = universalCard.color;
    }


}