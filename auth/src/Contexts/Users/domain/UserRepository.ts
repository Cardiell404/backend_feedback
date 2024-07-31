import { Criteria, Filters, Nullable } from '@__feedback__/shared';
import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;

  search(filters: Filters): Promise<Nullable<User>>;
  
  searchAll(criteria: Criteria): Promise<Array<User>>;


}
