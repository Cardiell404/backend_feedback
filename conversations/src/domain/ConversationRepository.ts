import { ConversationId } from './ConversationId';
import { Conversation } from './Conversation';
import { SendConversation } from './Send/SendConversation';
import { Nullable, Criteria } from '@__feedback__/shared';

export interface ConversationRepository {
  save(Conversation: Conversation): Promise<void>;

  update(Conversation: Conversation): Promise<void>;

  search(id: ConversationId): Promise<Nullable<Conversation>>;
  
  searchAll(): Promise<Array<Conversation>>;

  matching(criteria: Criteria): Promise<Array<Conversation>>;

  send(Conversation: SendConversation): Promise<void>

}
