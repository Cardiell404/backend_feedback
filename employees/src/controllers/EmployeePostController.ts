import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { CreateEmployeeCommand } from '../application/Create/CreateEmployeeCommand';
import { CommandBus, Uuid } from '@__feedback__/shared';
import { Controller } from './Controller';

export class EmployeePostController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = Uuid.random().value;
    const name: string = req.body.name;
    const lastName: string = req.body.lastName;
    const number: string = req.body.employeeNumber;
    const rfc: string = req.body.rfc;
    const nss: string = req.body.nss;
    const curp: string = req.body.curp;
    const birthday: string = req.body.birthday;
    const email: string = req.body.email;
    const phoneNumber: string = req.body.phoneNumber;
    const age: number = req.body.age;
    const isManager: boolean = req.body.isManager;
    const staff: Array<string> = req.body.staff;
    const manager: string = req.body.manager;
    const hidden = false;
    const createdBy = req.currentUser?.id || id;
    const createDate: Date = new Date()

    const createEmployeeCommand = new CreateEmployeeCommand({ id, name, lastName, number, age, curp, rfc, birthday, email, phoneNumber, nss, isManager, staff, manager, hidden, createDate, createdBy });
    await this.commandBus.dispatch(createEmployeeCommand);
    res.status(httpStatus.CREATED).send({id});
  }
}
