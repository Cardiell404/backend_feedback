import { Query, QueryHandler } from '@__feedback__/shared';
import { ReflectionResponse } from '../ReflectionResponse';
import { ReflectionFinder } from './ReflectionFinder';
import { FindReflectionQuery } from './FindReflectionQuery';

export class FindReflectionQueryHandler implements QueryHandler<ReflectionFinder, ReflectionResponse> {

  constructor(private finder: ReflectionFinder) {}

  subscribedTo(): Query {
    return FindReflectionQuery;
  }

  handle(_query: FindReflectionQuery): Promise<ReflectionResponse> {
    return this.finder.run();
  }
}
