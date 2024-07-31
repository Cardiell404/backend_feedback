export interface IEmployee {
  readonly _id: string;
  readonly name: string;
  readonly lastName: string;
  readonly number: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly birthday: string;
  readonly isManager: boolean;
  readonly manager: string;
  readonly staff: Array<string>;
}