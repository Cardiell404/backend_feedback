export interface IFeedback {
    id?: string;
    title?: string;
    description?: string;
    createDate?: string;
    additionalDetails?: string;
    responses?: IMember[];
}

export interface IMember{
    name: string;
    lastName: string;
    avatar?: string | null;
}
