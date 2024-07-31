import { Goal } from "../../domain/Goal";

export class GoalResponse {

  readonly goal: Goal;

  constructor(goal: Goal) {
    this.goal = goal;
  }
}
