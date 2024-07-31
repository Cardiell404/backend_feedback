import { Conversation } from "../../domain/Conversation";
import { ConversationAdditionalDetails } from "../../domain/ConversationAdditionalDetails";
import { ConversationDescription } from "../../domain/ConversationDescription";
import { ConversationId } from "../../domain/ConversationId";
import { ConversationRepository } from "../../domain/ConversationRepository";
import { ConversationTitle } from "../../domain/ConversationTitle";


type Params = {
  conversationId: ConversationId;
  conversationTitle?: ConversationTitle;
  conversationDescription?: ConversationDescription;
  conversationAdditionalDetails?: ConversationAdditionalDetails;
  conversationHidden?: boolean;
};


export class ConversationUpdater {
  private repository: ConversationRepository;

  constructor(repository: ConversationRepository) {
    this.repository = repository;
  }

  async run({ conversationId, conversationTitle, conversationDescription, conversationAdditionalDetails, conversationHidden }: Params): Promise<void> {
    const conversation = Conversation.update(conversationId, conversationTitle, conversationDescription, conversationAdditionalDetails, conversationHidden);
    await this.repository.update(conversation);
  }
}
