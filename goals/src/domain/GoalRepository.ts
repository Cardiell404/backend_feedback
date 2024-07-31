import { Nullable, Criteria, Filters } from '@__feedback__/shared';
import { Goal } from './Goal';

export interface GoalRepository {
  save(goal: Goal): Promise<void>;

  search(filters: Filters): Promise<Nullable<Goal>>;
  
  searchAll(criteria: Criteria): Promise<Array<Goal>>

}
