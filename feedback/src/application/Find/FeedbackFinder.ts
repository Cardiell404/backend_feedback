import { FeedbackRepository } from "../../domain/FeedbackRepository";
import { FeedbackResponse } from "../FeedbackResponse";

export class FeedbackFinder {
  constructor(private repository: FeedbackRepository) {}

  async run() {
    const data = await this.repository.searchAll();
    return new FeedbackResponse(data);
  }
}
