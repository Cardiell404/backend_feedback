import { Nullable, Criteria, UserId, MongoRepository } from '@__feedback__/shared';
import { Feedback } from '../../../domain/Feedback';
import { FeedbackRepository } from '../../../domain/FeedbackRepository';
import { IFeedback } from '../../../domain/IFeedback';
import { SendFeedback } from '../../../domain/Send/SendFeedback';

export class MongoFeedbackRepository extends MongoRepository<Feedback> implements FeedbackRepository {

  public async save(feedback: Feedback): Promise<void> {
    const collection = await this.collection();
    const id = feedback.id.value
    const document = { ...feedback.toPrimitives(), _id: id, id: undefined };
    await collection.updateOne({_id: id}, {$set: document}, {upsert: true});
  }

  public async update(feedback: Feedback): Promise<void> {
    const collection = await this.collection();
    const id = feedback.id.value
    const document = { ...feedback.toPrimitives() };
    await collection.findOneAndUpdate({ _id: id }, { $set: document });
  }

  public async search(id: UserId): Promise<Nullable<Feedback>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    return document ? Feedback.fromPrimitives({ 
      id: id.value,
      title: document.title,
      description: document.description,
      responses: document.responses,
      createDate: document.createDate,
      additionalDetails: document.additionalDetails
     }) : null;
  }

  public async searchAll(): Promise<Array<Feedback>> {
    const collection = await this.collection();
    const document = await collection.aggregate().toArray();

    return document.map((feedback) => Feedback.fromPrimitives({
      id: feedback._id,
      title: feedback.title,
      description: feedback.description,
      responses: feedback.responses,
      additionalDetails: feedback.additionalDetails,
      createDate: feedback.createDate,
      }))
  }

  public async matching(criteria: Criteria): Promise<Feedback[]> {
    const document = await this.searchAllByCriteria<IFeedback>(criteria);
    console.log(document);
    return document.map((feedback) => Feedback.fromPrimitives({
      id: feedback._id,
      title: feedback.title,
      description: feedback.description,
      responses: feedback.responses.map((response: any) => ({
        userId: response.userId,
        date: response.date,
        name: response.employee?.name,
        lastName: response.employee?.lastName,
        avatar:  response.employee?.user.avatar,
        message: response.message,
      })),
      additionalDetails: feedback.additionalDetails,
      createDate: feedback.createDate,
      }))
  }

  async send(feedback: SendFeedback): Promise<void> {
    const collection = await this.collection();
    const {id, userId, message, createDate: date} = feedback.toPrimitives();
    try {
      await collection.updateOne({ _id: id, 'responses.userId': userId }, { $set: {'responses.$.message': message , 'responses.$.date': date} }, { upsert: true });
    }catch(error) {
      console.log(error);
    }
  }

  protected moduleName(): string {
    return 'feedback';
  }
}
