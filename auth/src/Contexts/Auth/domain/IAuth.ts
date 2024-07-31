export interface IAuth {
  readonly _id: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly avatar?: string;
  readonly rol: string;
  readonly hidden: boolean;
  readonly createdBy: string
  readonly createDate: Date
  readonly employee: {
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
  };
}
