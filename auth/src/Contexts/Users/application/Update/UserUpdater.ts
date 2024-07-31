
import { UserAvatar, UserId } from "@__feedback__/shared";
import { User } from "../../domain/User";
import { UserEmail } from "../../domain/value-objects/UserEmail";
import { UserName } from "../../../Shared/domain/UserName";
import { UserPassword } from "../../domain/value-objects/UserPassword";
import { UserRepository } from "../../domain/UserRepository";
import { UserRol } from "../../domain/value-objects/UserRol";
import { FiltersMapping } from "../../../../utils/FiltersMapping";
import { UserNotExist } from "../../domain/errors/UserNotExist";


type Params = {
  id: UserId;
  username?: UserName;
  password?: UserPassword;
  email?: UserEmail;
  rol?: UserRol;
  hidden?: boolean;
  avatar?: UserAvatar;
};

export class UserUpdater {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({ id, username, password, email, avatar, rol, hidden }: Params): Promise<void> {

    const user = await this.getUserByIdIfExist(id.value);

    const newUser = User.update(id, 
      username || user.username,  
      password || user.password, 
      email    || user.email, 
      rol      || user.rol, 
      (hidden != undefined) ? hidden : user.hidden, 
      avatar   || user.avatar);
    await this.repository.save( newUser);
  }

  private async getUserByIdIfExist(id: string): Promise<User> {
    const user = await this.repository.search(FiltersMapping.id(id));

    if(!user) {
      throw new UserNotExist();
    }

    return user
  }
}
