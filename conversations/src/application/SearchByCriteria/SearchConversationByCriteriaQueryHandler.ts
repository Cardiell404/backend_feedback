import { Query, QueryHandler, Order, Filters } from '@__feedback__/shared';
import { ConversationResponse } from '../ConversationResponse';
import { ConversationByCriteriaSearcher } from './ConversationByCriteriaSearcher';
import { SearchConversationByCriteriaQuery } from './SearchConversationByCriteriaQuery';

export class SearchConversationByCriteriaQueryHandler implements QueryHandler<SearchConversationByCriteriaQuery, ConversationResponse> {
  constructor(private searcher: ConversationByCriteriaSearcher) {}

  subscribedTo(): Query {
    return SearchConversationByCriteriaQuery;
  }

  handle(query: SearchConversationByCriteriaQuery): Promise<ConversationResponse> {
    const filters = Filters.fromValues(query.filters);
    const order = Order.fromValues(query.orderBy, query.orderType);
    return this.searcher.run(filters, order, query.offset, query.limit);
  }
}
