import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
export default class StatusGetController implements Controller {

  async run(_req: Request, _res: Response): Promise<void> {
    _res.status(httpStatus.OK).send();
  }
}
