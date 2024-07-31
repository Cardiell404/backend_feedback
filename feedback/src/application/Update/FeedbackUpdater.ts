import { Feedback } from "../../domain/Feedback";
import { FeedbackAdditionalDetails } from "../../domain/FeedbackAdditionalDetails";
import { FeedbackDescription } from "../../domain/FeedbackDescription";
import { FeedbackId } from "../../domain/FeedbackId";
import { FeedbackRepository } from "../../domain/FeedbackRepository";
import { FeedbackTitle } from "../../domain/FeedbackTitle";


type Params = {
  feedbackId: FeedbackId;
  feedbackTitle?: FeedbackTitle;
  feedbackDescription?: FeedbackDescription;
  feedbackAdditionalDetails?: FeedbackAdditionalDetails;
  feedbackHidden?: boolean;
};


export class FeedbackUpdater {
  private repository: FeedbackRepository;

  constructor(repository: FeedbackRepository) {
    this.repository = repository;
  }

  async run({ feedbackId, feedbackTitle, feedbackDescription, feedbackAdditionalDetails, feedbackHidden }: Params): Promise<void> {
    const feedback = Feedback.update(feedbackId, feedbackTitle, feedbackDescription, feedbackAdditionalDetails, feedbackHidden);
    await this.repository.update(feedback);
  }
}
