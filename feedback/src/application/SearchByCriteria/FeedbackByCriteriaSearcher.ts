import { Criteria, Filters, Order } from '@__feedback__/shared';
import { Feedback } from '../../domain/Feedback';
import { FeedbackRepository } from '../../domain/FeedbackRepository';
import { FeedbackResponse } from '../FeedbackResponse';
import { BucketRepository } from '../../domain/s3/BucketRepository';

export class FeedbackByCriteriaSearcher {
  constructor(private repository: FeedbackRepository, private bucketRepository: BucketRepository
    ) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<FeedbackResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    let feedback = await this.repository.matching(criteria);
    feedback = await this.setAvatarInUsersResponse(feedback);
    return new FeedbackResponse(feedback);
  }

  private async setAvatarInUsersResponse(feedback: Feedback[]): Promise<Feedback[]> {
    return await Promise.all(feedback.map(async(feedback) => {
      if(feedback.responses) {
        await Promise.all(feedback.responses?.value.map(async (response) => {
          if(response.avatar) {
            const avatar = await this.bucketRepository.getAvatar(response.avatar);
            if(avatar) {
              response.avatar = avatar.value;
            }
          }
          return response;
        }))
      }
      return feedback;
    }))
  }
}
