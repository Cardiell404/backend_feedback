import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { JwtMiddleware } from '@__feedback__/shared';

export const register = (router: Router) => {
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const statusGetController = container.get('Apps.feedback.controllers.StatusGetController');
  router.get('/api/users/status', (req: Request, res: Response) => statusGetController.run(req, res));

  const userPostController = container.get('Apps.feedback.controllers.UserPostController');
  router.post('/api/users', (req: Request, res: Response) => userPostController.run(req, res));

  const userPutController = container.get('Apps.feedback.controllers.UserPutController');
  router.put('/api/users/:id', (req: Request, res: Response) => userPutController.run(req, res));

  const usersGetByCriteriaController = container.get('Apps.feedback.controllers.UsersGetByCriteriaController');
  router.post('/api/users/search', (req: Request, res: Response) => usersGetByCriteriaController.run(req, res));

  const userGetByIdController = container.get('Apps.feedback.controllers.UserGetByIdController');
  router.get('/api/users/:id', (req: Request, res: Response) => userGetByIdController.run(req, res));

  const userUploadAvatarController = container.get('Apps.feedback.controllers.UserUploadAvatarController');
  router.post('/api/users/avatar/upload', jwt.tokenValidation(), (req: Request, res: Response) => userUploadAvatarController.run(req, res));

};
