import { EnumValueObject, InvalidArgumentError } from "@__feedback__/shared";

export enum Status {
  OPENED = 'OPENED',
  COMPLETED = 'COMPLETED'
}

export class GoalStatus extends EnumValueObject<Status> {
  constructor(value: Status) {
    super(value, Object.values(Status));
  }

  static fromValue(value: string): GoalStatus {
    switch (value) {
      case Status.OPENED:
        return new GoalStatus(Status.OPENED);
      case Status.COMPLETED:
        return new GoalStatus(Status.COMPLETED);
      default:
        throw new InvalidArgumentError(`The order type ${value} is invalid`);
    }
  }

  public isOpened(): boolean {
    return this.value === Status.OPENED;
  }

  public isCompleted(): boolean {
    return this.value === Status.COMPLETED;
  }

  protected throwErrorForInvalidValue(value: Status): void {
    throw new InvalidArgumentError(`The status ${value} is invalid`);
  }
}