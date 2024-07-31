import { AuthNotExist } from "../../domain/errors/AuthNotExist";
import { AuthRepository } from "../../domain/AuthRepository";
import { AuthCurrentUserResponse } from "./AuthCurrentUserResponse";

export class AuthCurrentUser {

  constructor(private repository: AuthRepository) {
  }

  async run( _id: string): Promise<AuthCurrentUserResponse> {
    const data = await this.repository.currentuser(_id);
    if (!data) {
      throw new AuthNotExist();
    }
    return new AuthCurrentUserResponse({user: {id: data.id.value, username: data.username!.value, email: data.email!.value}});
  }
}
