export interface IEmployee {
  readonly _id: string;
  readonly name: string;
  readonly lastName: string;
  readonly number: string;
  readonly age: number;
  readonly curp: string;
  readonly rfc: string;
  readonly nss: string;
  readonly email: string;
  readonly phoneNumber: string;
  readonly birthday: string;
  readonly isManager: boolean;
  readonly hidden: boolean;
  readonly manager: string;
  readonly staff?: Array<string>;
  readonly createDate: Date;
  readonly createdBy: string;
}