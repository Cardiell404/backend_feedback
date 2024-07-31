import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    name: string;
    lastName: string;
    number: string;
    age: number;
    curp: string;
    rfc: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    nss: string;
    isManager: boolean;
    createdBy: string;
    createDate: Date;
    hidden: boolean;
    manager?: string;
    staff?: Array<string>;
};

export class CreateEmployeeCommand extends Command {
    id: string;
    name: string;
    lastName: string;
    number: string;
    age: number;
    curp: string;
    rfc: string;
    birthday: string;
    email: string;
    phoneNumber: string;
    nss: string;
    isManager: boolean;
    hidden: boolean;
    createdBy: string;
    createDate: Date;
    manager?: string;
    staff?: Array<string>;

    constructor({ id, name, lastName, number, age, curp, rfc, birthday, email, phoneNumber, nss, isManager, staff, manager, hidden, createDate, createdBy }: Params) {
        super();
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.number = number;
        this.age = age;
        this.curp = curp;
        this.rfc = rfc;
        this.birthday = birthday;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.nss = nss;
        this.isManager = isManager;
        this.staff = staff;
        this.manager = manager;
        this.createDate = createDate;
        this.createdBy = createdBy;
        this.hidden = hidden;
    }
}
