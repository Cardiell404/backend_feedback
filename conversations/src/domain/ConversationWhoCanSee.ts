import { UserId } from "@__feedback__/shared";

export class ConversationWhoCanSee {

  readonly value: Array<UserId>;

  constructor(value: Array<UserId>) {
    this.value = value;
  }
}