import { FeedbackId } from './FeedbackId';
import { Feedback } from './Feedback';
import { SendFeedback } from './Send/SendFeedback';
import { Nullable, Criteria } from '@__feedback__/shared';

export interface FeedbackRepository {
  save(feedback: Feedback): Promise<void>;

  update(feedback: Feedback): Promise<void>;

  search(id: FeedbackId): Promise<Nullable<Feedback>>;
  
  searchAll(): Promise<Array<Feedback>>;

  matching(criteria: Criteria): Promise<Array<Feedback>>;

  send(feedback: SendFeedback): Promise<void>

}
