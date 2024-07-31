export interface IBoard {
    id: string;
    title: string;
    subtitle: string;
    actionName: string;
    color: string;
    icon?: string | null;
    cards?: ICard[];
}
export interface ICard {
    id: string;
    title: string;
    description?: string | null;
    members?: IMember[];
    dueDate?: string | null;
}
export interface IMember{
    name: string;
    lastName: string;
    avatar?: string | null;
}

export interface IUniversalCard {
    icon: string;
    title: string;
    description: string;
    link: string;
    color: string;
}