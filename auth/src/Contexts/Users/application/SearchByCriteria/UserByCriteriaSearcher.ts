import { Filters } from "@__feedback__/shared";
import { UserRepository } from "../../domain/UserRepository";
import { UserNotExist } from "../../domain/errors/UserNotExist";
import { UserResponse } from "./UserResponse";

export class UserByCriteriaSearcher {
  constructor(private repository: UserRepository) {}

  async run(filters: Filters) {
    const result = await this.repository.search(filters);
    if(!result) {
      throw new UserNotExist();
    }
    return new UserResponse(result);
  }
}
