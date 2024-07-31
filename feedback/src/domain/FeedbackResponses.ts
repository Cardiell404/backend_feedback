import { FeedbackMesage } from './FeedbackMesage';
import { UserId } from "@__feedback__/shared";

type FeedbackResponse = {userId: UserId, message?: FeedbackMesage, date?: Date, name?: string, lastName?: string, avatar?: string}

export class FeedbackResponses {

  readonly value: Array<FeedbackResponse>;

  constructor(value: Array<FeedbackResponse>) {
    this.value = value;
  }
}
