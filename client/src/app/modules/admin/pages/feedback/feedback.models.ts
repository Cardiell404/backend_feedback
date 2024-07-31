import { IFeedback, IMember } from './feedback.types';

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

export class Feedback implements Required<IFeedback> {
    id: string;
    title: string;
    description: string;
    createDate: string;
    additionalDetails: string;
    responses: IMember[];

    constructor(feedback: IFeedback) {
        this.id                = feedback.id;
        this.title             = feedback.title;
        this.description       = feedback.description || null;
        this.additionalDetails = feedback.additionalDetails;
        this.responses           = [];
        this.createDate        = feedback.createDate;
        if ( feedback.responses ) {
            this.responses = feedback.responses.map((member) => {
                if ( !(member instanceof Member) ) {
                    return new Member(member);
                }
                return member;
            });
        }
    }
}
