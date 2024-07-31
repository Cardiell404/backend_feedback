import { Filters } from "@__feedback__/shared";
import { GoalRepository } from "../../domain/GoalRepository";
import { GoalResponse } from "./GoalResponse";
import { GoalNotExist } from "../../domain/errors/GoalNotExist";

export class GoalByCriteriaSearcher {
  constructor(private repository: GoalRepository) {}

  async run(filters: Filters) {
    const result = await this.repository.search(filters);

    if(!result) {
      throw new GoalNotExist();
    }

    return new GoalResponse(result);
  }
}
