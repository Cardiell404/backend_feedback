import { IMember, IReflection } from './reflection.types';

export class Member implements Required<IMember> {
    name: string;
    avatar: string | null;

    constructor(member: IMember) {
        this.name = member.name;
        this.avatar = member.avatar || null;
    }
}

export class Reflection implements Required<IReflection> {
    id: string;
    title: string;
    description: string;
    createDate: string;
    additionalDetails: string;
    responses: IMember[];

    constructor(reflection: IReflection) {
        this.id                = reflection.id;
        this.title             = reflection.title;
        this.description       = reflection.description || null;
        this.additionalDetails = reflection.additionalDetails;
        this.responses           = [];
        this.createDate        = reflection.createDate;
        if ( reflection.responses ) {
            this.responses = reflection.responses.map((member) => {
                if ( !(member instanceof Member) ) {
                    return new Member(member);
                }
                return member;
            });
        }
    }
}
