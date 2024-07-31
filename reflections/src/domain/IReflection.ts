export interface IReflection  {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly responses: Array<{userId: string, message?: string, date?: Date}>;
  readonly createdBy?: string;
  readonly createDate?: Date;
  readonly hidden?: boolean;
  readonly additionalDetails: string;
};