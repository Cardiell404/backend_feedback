import { Request, Response } from 'express';
import httpStatus from 'http-status';


export class AuthSignOutController {

  async run(req: Request, res: Response) {
    req.session = null;
    res.status(httpStatus.OK).send();
  }
}
