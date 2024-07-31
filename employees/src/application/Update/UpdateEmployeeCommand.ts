import { Command } from "@__feedback__/shared";

type Params = {
    id: string;
    name?: string;
    lastName?: string;
    number?: string;
    age?: number;
    curp?: string;
    rfc?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    nss?: string;
    isManager?: boolean;
    hidden?: boolean;
    manager?: string;
    staff?: Array<string>;
};

export class UpdateEmployeeCommand extends Command {
    id: string;
    name?: string;
    lastName?: string;
    number?: string;
    age?: number;
    curp?: string;
    rfc?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    nss?: string;
    isManager?: boolean;
    hidden?: boolean;
    manager?: string;
    staff?: Array<string>;

    constructor({ id, name, lastName,number, age, curp, rfc, birthday, phoneNumber, nss, isManager, staff, manager, hidden, email }: Params) {
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
        this.hidden = hidden;
    }
}
