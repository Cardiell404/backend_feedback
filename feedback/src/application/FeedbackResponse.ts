import { Feedback } from "../domain/Feedback";

export class FeedbackResponse {
  readonly feedback: Array<Feedback>;

  constructor(feedback: Array<Feedback>) {
    this.feedback = feedback;
  }
}
