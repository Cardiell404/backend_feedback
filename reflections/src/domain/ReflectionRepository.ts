import { ReflectionId } from './ReflectionId';
import { Reflection } from './Reflection';
import { SendReflection } from './Send/SendReflection';
import { Nullable, Criteria } from '@__feedback__/shared';

export interface ReflectionRepository {
  save(Reflection: Reflection): Promise<void>;

  update(Reflection: Reflection): Promise<void>;

  search(id: ReflectionId): Promise<Nullable<Reflection>>;
  
  searchAll(): Promise<Array<Reflection>>;

  matching(criteria: Criteria): Promise<Array<Reflection>>;

  send(Reflection: SendReflection): Promise<void>

}
