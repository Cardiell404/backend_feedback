import { Criteria, Filters, Order } from '@__feedback__/shared';
import { UsersResponse } from './UsersResponse';
import { UserRepository } from '../../domain/UserRepository';

export class UsersByCriteriaSearcher {
  constructor(private repository: UserRepository) {}

  async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<UsersResponse> {
    const criteria = new Criteria(filters, order, limit, offset);
    const users = await this.repository.searchAll(criteria);
    return new UsersResponse(users);
  }
}
