export interface IReflection {
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
