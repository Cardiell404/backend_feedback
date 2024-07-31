import { Nullable } from '@__feedback__/shared';
import { Auth } from './Auth';

export interface AuthRepository {
  login(email: string): Promise<Nullable<Auth>>;
  currentuser(_id: string): Promise<Nullable<Auth>>;
}
