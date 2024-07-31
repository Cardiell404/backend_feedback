export interface IGoal {
    id?:                string;
    title?:             string;
    dueDate?:           string;
    isPrivate?:         boolean;
    description?:       string;
    additionalDetails?: string;
    hidden?:            boolean;
}