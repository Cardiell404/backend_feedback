import { User } from "../../domain/User";

export class UsersResponse {

  readonly users: Array<User>;

  constructor(users: Array<User>) {
    this.users = users;
  }
}
