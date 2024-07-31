import { IGoal } from "./goal.types";

export class Goal implements Required<IGoal> {
    id: string;
    title: string;
    dueDate: string;
    isPrivate: boolean;
    description: string;
    additionalDetails: string;
    hidden: boolean;

    constructor(goal: IGoal) {
        this.id                = goal.id;
        this.title             = goal.title;
        this.description       = goal.description || null;
        this.additionalDetails = goal.additionalDetails;
        this.hidden            = goal.hidden;
        this.isPrivate         = goal.isPrivate;
        this.dueDate           = goal.dueDate;
    }
}