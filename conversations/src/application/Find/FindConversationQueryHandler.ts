import { Query, QueryHandler } from '@__feedback__/shared';
import { ConversationResponse } from '../ConversationResponse';
import { ConversationFinder } from './ConversationFinder';
import { FindConversationQuery } from './FindConversationQuery';

export class FindConversationQueryHandler implements QueryHandler<ConversationFinder, ConversationResponse> {

  constructor(private finder: ConversationFinder) {}

  subscribedTo(): Query {
    return FindConversationQuery;
  }

  handle(_query: FindConversationQuery): Promise<ConversationResponse> {
    return this.finder.run();
  }
}
