import { Nullable, Criteria, MongoRepository, Filters } from '@__feedback__/shared';
import { User } from '../../../domain/User';
import { UserRepository } from '../../../domain/UserRepository';
import { IUser } from '../../../domain/IUser';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  
  public async save(user: User): Promise<void> {
    this.persist(user.id.value, user);
  }

  public async search(filters: Filters): Promise<Nullable<User>> {
    console.log('Search User');

    const document = await this.searchByCriteria<IUser>(filters);
    console.log(document);
    return document ? User.fromPrimitives({      
      id: document._id,
      username: document.username,
      password: document.password,
      email: document.email,
      rol: document.rol,
      hidden: document.hidden,
      createdBy: document.createdBy,
      createDate: document.createDate,
      avatar: document.avatar
    }) : null;
  }

  public async searchAll(criteria: Criteria): Promise<Array<User>> {
    const documents = await this.searchAllByCriteria<IUser>(criteria);
    console.log(documents)
    return documents.map((document) => User.fromPrimitives({
      id: document._id,
      username: document.username,
      password: document.password,
      email: document.email,
      rol: document.rol,
      hidden: document.hidden,
      createdBy: document.createdBy,
      createDate: document.createDate,
      avatar: document.avatar
    }))
  }

  protected moduleName(): string {
    return 'users';
  }
}
