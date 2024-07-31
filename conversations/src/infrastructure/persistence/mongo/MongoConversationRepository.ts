
import { Criteria, Nullable, UserId, MongoRepository } from '@__feedback__/shared';
import { Conversation } from '../../../domain/Conversation';
import { ConversationRepository } from '../../../domain/ConversationRepository';
import { IConversation } from '../../../domain/IConversation';
import { SendConversation } from '../../../domain/Send/SendConversation';

export class MongoConversationRepository extends MongoRepository<Conversation> implements ConversationRepository {

  public async save(conversation: Conversation): Promise<void> {
    this.persist(conversation.id.value, conversation);
  }

  public async update(conversation: Conversation): Promise<void> {
    const collection = await this.collection();
    const id = conversation.id.value
    const document = { ...conversation.toPrimitives() };
    await collection.findOneAndUpdate({ _id: id }, { $set: document });
  }

  public async search(id: UserId): Promise<Nullable<Conversation>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    return document ? Conversation.fromPrimitives({ 
      id: id.value,
      title: document.title,
      description: document.description,
      comments: document.comments,
      createDate: document.createDate,
      additionalDetails: document.additionalDetails
     }) : null;
  }

  public async searchAll(): Promise<Array<Conversation>> {
    const collection = await this.collection();
    const document = await collection.aggregate().toArray();

    return document.map((conversation) => Conversation.fromPrimitives({
      id: conversation._id,
      title: conversation.title,
      description: conversation.description,
      comments: conversation.comments,
      additionalDetails: conversation.additionalDetails,
      createDate: conversation.createDate,
      }))
  }

  public async matching(criteria: Criteria): Promise<Conversation[]> {
    const document = await this.searchAllByCriteria<IConversation>(criteria);
    console.log(document);
    return document.map((conversation) => Conversation.fromPrimitives({
      id: conversation._id,
      title: conversation.title,
      description: conversation.description,
      comments: conversation.comments,
      whoCanSee: conversation.whoCanSee,
      additionalDetails: conversation.additionalDetails,
      createDate: conversation.createDate,
      }))
  }

  async send(conversation: SendConversation): Promise<void> {
    const collection = await this.collection();
    try {
      const conversationId = conversation.conversationId.value;
      const comments = {...conversation.toPrimitives(), conversationId: undefined};
      await collection.updateOne({ _id: conversationId }, { $push: {comments}}, { upsert: true });
    }catch(error) {
      console.log(error);
    }
  }

  protected moduleName(): string {
    return 'conversations';
  }
}
