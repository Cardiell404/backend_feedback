import { UserId } from "@__feedback__/shared";
import { CommentId } from "./CommentId";
import { CommentText } from "./CommentText";

type ConversationComment = {commentBy: UserId, datePublished: Date, text: CommentText, id: CommentId}

export class ConversationComments {

  readonly value: Array<ConversationComment>;

  constructor(value: Array<ConversationComment>) {
    this.value = value;
  }
}