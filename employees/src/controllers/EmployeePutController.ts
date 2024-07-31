import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UpdateEmployeeCommand } from '../application/Update/UpdateEmployeeCommand';
import { CommandBus } from '@__feedback__/shared';
import { Controller } from './Controller';

export class EmployeePutController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const name: string = req.body.name;
    const lastName: string = req.body.lastName;
    const number: string = req.body.employeeNumber;
    const isManager: boolean = req.body.isManager;
    const manager: string = req.body.manager;
    const staff: Array<string> = req.body.staff;
    const rfc: string = req.body.rfc;
    const nss: string = req.body.nss;
    const curp: string = req.body.curp;
    const birthday: string = req.body.birthday;
    const email: string = req.body.email;
    const phoneNumber: string = req.body.phoneNumber;
    const age: number = req.body.age;


    const updateEmployeeCommand = new UpdateEmployeeCommand({ id, name, lastName, number, age, rfc, nss, curp, birthday, email, phoneNumber, isManager, manager, staff });
    await this.commandBus.dispatch(updateEmployeeCommand);
    res.status(httpStatus.CREATED).send();
  }
}
