import { Router, Request, Response } from 'express';
import StatusGetController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller: StatusGetController = container.get('Apps.feedback.controllers.StatusGetController');
  router.get('/status', (req: Request, res: Response) => controller.run(req, res));
};
