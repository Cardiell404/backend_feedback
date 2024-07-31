import { UserId } from '@__feedback__/shared';
import { FeedbackDescription } from './../domain/FeedbackDescription';
import { Feedback } from '../domain/Feedback';
import { FeedbackTitle } from '../domain/FeedbackTitle';
import { FeedbackRepository } from '../domain/FeedbackRepository';
import { FeedbackId } from '../domain/FeedbackId';
import { FeedbackResponses } from '../domain/FeedbackResponses';
import { FeedbackAdditionalDetails } from '../domain/FeedbackAdditionalDetails';

type Params = {
  feedbackId: FeedbackId;
  feedbackTitle: FeedbackTitle;
  feedbackDescription: FeedbackDescription;
  feedbackResponses: FeedbackResponses;
  feedbackCreatedBy: UserId,
  feedbackCreateDate?: Date;
  feedbackAdditionalDetails: FeedbackAdditionalDetails;
  feedbackHidden: boolean;
};


export class FeedbackCreator {
  private repository: FeedbackRepository;

  constructor(repository: FeedbackRepository) {
    this.repository = repository;
  }

  async run({ feedbackId, feedbackTitle, feedbackDescription, feedbackResponses, feedbackCreatedBy, feedbackCreateDate, feedbackAdditionalDetails, feedbackHidden }: Params): Promise<void> {
    const feedback = Feedback.create(feedbackId, feedbackTitle, feedbackDescription, feedbackAdditionalDetails, feedbackResponses, feedbackCreatedBy, feedbackCreateDate, feedbackHidden);
    await this.repository.save(feedback);
  }
}
