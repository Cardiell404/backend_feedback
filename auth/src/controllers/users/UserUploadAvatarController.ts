import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { QueryBus } from '@__feedback__/shared';
import { Controller } from '../Controller';
import { UploadResponse } from '../../Contexts/Users/application/Upload/UploadResponse';
import { UploadAvatarQuery } from '../../Contexts/Users/application/Upload/UploadAvatarQuery';


export class UserUploadAvatarController implements Controller {

  constructor(private queryBus: QueryBus) {
  }

  async run(req: Request & {id: string}, res: Response): Promise<void> {
    let { image } = req.body;
    const userId = req.currentUser?.id || ''
    try {
      const queryResponse = await this.queryBus.ask<UploadResponse>(new UploadAvatarQuery({image, userId}));
      res.status(200).send(queryResponse);
    } catch(e) {
      if(e instanceof Error ) {
        res.status(httpStatus.BAD_REQUEST).send({message: e.message});
      }
    }
  }
}
