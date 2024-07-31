import { Nullable, MongoRepository, Logger } from '@__feedback__/shared';
import { AuthRepository } from '../../../domain/AuthRepository';
import { Auth } from '../../../domain/Auth';
import container from '../../../../../dependency-injection';
import { IAuth } from '../../../domain/IAuth';

export class MongoAuthRepository extends MongoRepository<Auth> implements AuthRepository {

  public async currentuser(_id: string): Promise<Nullable<Auth>> {
    const collection = await this.collection();
    const logger: Logger = container.get('Shared.Logger');
    let document = await collection.findOne<IAuth>({'_id': _id});
    logger.info(document);
    return document ? Auth.fromPrimitives({
      email: document.email,
      username: document.username,
      password: document.password,
      id: document._id
    }) : null;
  }

  public async login(email: string): Promise<Nullable<Auth>> {
    const collection = await this.collection();
    let document = await collection.findOne<IAuth>({'email': email});
    return document ? Auth.fromPrimitives({
      email: document.email,
      username: document.username,
      password: document.password,
      id: document._id
    }) : null;
  }

  protected moduleName(): string {
    return 'users';
  }
}
