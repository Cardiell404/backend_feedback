import { SendFeedback } from './../../domain/Send/SendFeedback';
import { UserId } from "@__feedback__/shared";
import { FeedbackId } from "../../domain/FeedbackId";
import { FeedbackRepository } from "../../domain/FeedbackRepository";
import { FeedbackMesage } from "../../domain/FeedbackMesage";

type Params = {
  feedbackId: FeedbackId;
  feedbackMessage: FeedbackMesage;
  feedbackUserId: UserId
  feedbackCreateDate?: Date;
};


export class SendFeedbackCreator {
  private repository: FeedbackRepository;

  constructor(repository: FeedbackRepository) {
    this.repository = repository;
  }

  async run({ feedbackId, feedbackMessage, feedbackCreateDate, feedbackUserId }: Params): Promise<void> {
    const sendFeedback = SendFeedback.create(feedbackId,feedbackMessage,feedbackUserId, feedbackCreateDate);
    await this.repository.send(sendFeedback);
  }
}
