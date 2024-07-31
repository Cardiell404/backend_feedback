import { Criteria, Order, Filters } from '@__feedback__/shared';
import { ConversationRepository } from '../../domain/ConversationRepository';
import { ConversationResponse } from '../ConversationResponse';

export class ConversationByCriteriaSearcher {
  constructor(private repository: ConversationRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<ConversationResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const conversation = await this.repository.matching(criteria);
    return new ConversationResponse(conversation);
  }
}
