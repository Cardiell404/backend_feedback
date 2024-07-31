export interface IConversation {
    id?: string;
    title?: string;
    description?: string;
    createDate?: string;
    additionalDetails?: string;
    responses?: IMember[];
}

export interface IMember{
    name: string;
    avatar?: string | null;
}
