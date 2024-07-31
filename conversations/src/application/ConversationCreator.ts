import { ConversationWhoCanSee } from '../domain/ConversationWhoCanSee';
import { ConversationDescription } from '../domain/ConversationDescription';
import { Conversation } from '../domain/Conversation';
import { ConversationTitle } from '../domain/ConversationTitle';
import { ConversationRepository } from '../domain/ConversationRepository';
import { ConversationId } from '../domain/ConversationId';
import { ConversationAdditionalDetails } from '../domain/ConversationAdditionalDetails';
import { UserId } from '@__feedback__/shared';

type Params = {
  conversationId: ConversationId;
  conversationTitle: ConversationTitle;
  conversationDescription: ConversationDescription;
  conversationCreatedBy: UserId,
  conversationWhoCanSee: ConversationWhoCanSee;
  conversationCreateDate?: Date;
  conversationAdditionalDetails: ConversationAdditionalDetails;
  conversationHidden: boolean;
};


export class ConversationCreator {
  private repository: ConversationRepository;

  constructor(repository: ConversationRepository) {
    this.repository = repository;
  }

  async run({ conversationId, conversationTitle, conversationDescription, conversationCreatedBy, conversationWhoCanSee, conversationCreateDate, conversationAdditionalDetails, conversationHidden }: Params): Promise<void> {
    const conversation = Conversation.create(conversationId, conversationTitle, conversationDescription, conversationAdditionalDetails, conversationCreatedBy, conversationWhoCanSee, conversationCreateDate, conversationHidden);
    await this.repository.save(conversation);
  }
}
