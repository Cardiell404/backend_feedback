export interface IConversation {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly createdBy?: string;
  readonly whoCanSee?: Array<string>
  readonly createDate?: Date;
  readonly hidden?: boolean;
  readonly additionalDetails: string;
  readonly comments?: IComment[];
};

interface IComment {
  commentBy: string;
  datePublished: Date;
  text: string;
  id: string;
}