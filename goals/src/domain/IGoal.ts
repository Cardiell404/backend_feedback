import { Status } from "./value-objects/GoalStatus";

export interface IGoal {
  readonly _id: string;
  readonly title: string;
  readonly richTextMessage: string;
  readonly description: string;
  readonly dueDate: Date;
  readonly isPrivate: boolean;
  readonly attachments: Array<string>
  readonly status: Status;
  readonly createdBy: string;
  readonly createdDate: Date
  readonly modifiedBy: string;
  readonly modifiedDate: Date;
  readonly hidden: boolean;
};