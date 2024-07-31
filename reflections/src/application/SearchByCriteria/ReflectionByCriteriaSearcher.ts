import { Criteria, Filters, Order } from '@__feedback__/shared';
import { ReflectionRepository } from '../../domain/ReflectionRepository';
import { ReflectionResponse } from '../ReflectionResponse';

export class ReflectionByCriteriaSearcher {
  constructor(private repository: ReflectionRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<ReflectionResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const reflection = await this.repository.matching(criteria);
    return new ReflectionResponse(reflection);
  }
}
