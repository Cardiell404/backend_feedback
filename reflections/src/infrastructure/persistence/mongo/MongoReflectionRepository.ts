import { IReflection } from '../../../domain/IReflection';
import { Criteria, Nullable, MongoRepository, UserId } from '@__feedback__/shared';
import { Reflection } from '../../../domain/Reflection';
import { ReflectionRepository } from '../../../domain/ReflectionRepository';
import { SendReflection } from '../../../domain/Send/SendReflection';

export class MongoReflectionRepository extends MongoRepository<Reflection> implements ReflectionRepository {

  public async save(reflection: Reflection): Promise<void> {
    const collection = await this.collection();
    const id = reflection.id.value
    const document = { ...reflection.toPrimitives(), _id: id, id: undefined };
    await collection.updateOne({_id: id}, {$set: document}, {upsert: true});
  }

  public async update(reflection: Reflection): Promise<void> {
    const collection = await this.collection();
    const id = reflection.id.value
    const document = { ...reflection.toPrimitives() };
    await collection.findOneAndUpdate({ _id: id }, { $set: document });
  }

  public async search(id: UserId): Promise<Nullable<Reflection>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.value });

    return document ? Reflection.fromPrimitives({ 
      id: id.value,
      title: document.title,
      description: document.description,
      responses: document.responses,
      createDate: document.createDate,
      additionalDetails: document.additionalDetails
     }) : null;
  }

  public async searchAll(): Promise<Array<Reflection>> {
    const collection = await this.collection();
    const document = await collection.aggregate().toArray() as IReflection[];

    return document.map((reflection) => Reflection.fromPrimitives({
      id: reflection._id,
      title: reflection.title,
      description: reflection.description,
      responses: reflection.responses?.map((response: any) => ({
        userId: response.userId,
        date: response.date,
        name: response.employee?.name,
        lastName: response.employee?.lastName,
        avatar:  response.employee.user?.avatar,
        message: response.message,
      })),
      additionalDetails: reflection.additionalDetails,
      createDate: reflection.createDate,
      }))
  }

  public async matching(criteria: Criteria): Promise<Reflection[]> {
    const documents = await this.searchAllByCriteria<IReflection>(criteria);
    console.log(documents);
    return documents.map((reflection) => Reflection.fromPrimitives({
      id: reflection._id,
      title: reflection.title,
      description: reflection.description,
      responses: reflection.responses?.map((response: any) => ({
        userId: response.userId,
        date: response.date,
        name: response.employee?.name,
        lastName: response.employee?.lastName,
        avatar:  response.employee.user?.avatar,
        message: response.message,
      })),
      additionalDetails: reflection.additionalDetails,
      createDate: reflection.createDate,
      }))
  }

  async send(reflection: SendReflection): Promise<void> {
    const collection = await this.collection();
    const {id, userId, message, createDate: date} = reflection.toPrimitives();
    try {
      await collection.updateOne({ _id: id, 'responses.userId': userId }, { $set: {'responses.$.message': message , 'responses.$.date': date} }, { upsert: true });
    }catch(error) {
      console.log(error);
    }
  }

  protected moduleName(): string {
    return 'reflections';
  }
}
