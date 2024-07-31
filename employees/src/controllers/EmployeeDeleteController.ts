import httpStatus from "http-status";
import { Request, Response } from 'express';
import { UpdateEmployeeCommand } from "../application/Update/UpdateEmployeeCommand";
import { CommandBus } from "@__feedback__/shared";
import { Controller } from "./Controller";


export class EmployeeDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(req: Request, res: Response) {
    const id: string = req.params.id;
    const updateEmployeeCommand = new UpdateEmployeeCommand({ id , hidden: true });
    await this.commandBus.dispatch(updateEmployeeCommand);
    res.status(httpStatus.NO_CONTENT).send();
  }
}
