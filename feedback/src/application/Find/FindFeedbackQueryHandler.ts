import { Query, QueryHandler } from '@__feedback__/shared';
import { FeedbackResponse } from '../FeedbackResponse';
import { FeedbackFinder } from './FeedbackFinder';
import { FindFeedbackQuery } from './FindFeedbackQuery';

export class FindFeedbackQueryHandler implements QueryHandler<FeedbackFinder, FeedbackResponse> {

  constructor(private finder: FeedbackFinder) {}

  subscribedTo(): Query {
    return FindFeedbackQuery;
  }

  handle(_query: FindFeedbackQuery): Promise<FeedbackResponse> {
    return this.finder.run();
  }
}
