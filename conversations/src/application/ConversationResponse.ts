import { Conversation } from "../domain/Conversation";

export class ConversationResponse {
  readonly conversation: Array<Conversation>;

  constructor(conversation: Array<Conversation>) {
    this.conversation = conversation;
  }
}
