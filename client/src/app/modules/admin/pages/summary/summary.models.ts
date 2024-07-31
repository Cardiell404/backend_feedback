import { IMember, ISummary } from './summary.types';

export class Member implements Required<IMember> {
    name: string;
    avatar: string | null;

    constructor(member: IMember) {
        this.name = member.name;
        this.avatar = member.avatar || null;
    }
}

export class Summary implements Required<ISummary> {
    id: string;
    title: string;
    description: string;
    createDate: string;
    additionalDetails: string;
    responses: IMember[];

    constructor(summary: ISummary) {
        this.id                = summary.id;
        this.title             = summary.title;
        this.description       = summary.description || null;
        this.additionalDetails = summary.additionalDetails;
        this.responses           = [];
        this.createDate        = summary.createDate;
        if ( summary.responses ) {
            this.responses = summary.responses.map((member) => {
                if ( !(member instanceof Member) ) {
                    return new Member(member);
                }
                return member;
            });
        }
    }
}
