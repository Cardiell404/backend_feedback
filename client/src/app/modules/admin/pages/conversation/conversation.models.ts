import { IConversation, IMember } from './conversation.types';

export class Member implements Required<IMember> {
    name: string;
    avatar: string | null;

    constructor(member: IMember) {
        this.name = member.name;
        this.avatar = member.avatar || null;
    }
}

export class Conversation implements Required<IConversation> {
    id: string;
    title: string;
    description: string;
    createDate: string;
    additionalDetails: string;
    responses: IMember[];

    constructor(conversation: IConversation) {
        this.id                = conversation.id;
        this.title             = conversation.title;
        this.description       = conversation.description || null;
        this.additionalDetails = conversation.additionalDetails;
        this.responses           = [];
        this.createDate        = conversation.createDate;
        if ( conversation.responses ) {
            this.responses = conversation.responses.map((member) => {
                if ( !(member instanceof Member) ) {
                    return new Member(member);
                }
                return member;
            });
        }
    }
}
