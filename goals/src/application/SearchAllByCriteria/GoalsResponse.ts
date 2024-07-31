import { Goal } from "../../domain/Goal";

export class GoalsResponse {

  readonly goals: Array<Goal>;

  constructor(goals: Array<Goal>) {
    this.goals = goals;
  }
}
