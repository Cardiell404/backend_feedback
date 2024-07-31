import { Router, Request, Response } from 'express';
import { JwtMiddleware } from '@__feedback__/shared';
import container from '../dependency-injection';

export const register = (router: Router) => {
  
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const reflectionPostController = container.get('Apps.feedback.controllers.ReflectionPostController');
  router.post('/api/reflections', jwt.tokenValidation()
  , (req: Request, res: Response) => reflectionPostController.run(req, res));

  const reflectionPutController = container.get('Apps.feedback.controllers.ReflectionPutController');
  router.put('/api/reflections/:id', jwt.tokenValidation()
  , (req: Request, res: Response) => reflectionPutController.run(req, res));

  const sendReflectionController = container.get('Apps.feedback.controllers.SendReflectionController');
  router.post('/api/reflections/:id/send', jwt.tokenValidation()
  , (req: Request, res: Response) => sendReflectionController.run(req, res));

  const reflectionGetByCriteriaController = container.get('Apps.feedback.controllers.ReflectionGetByCriteriaController');
  router.post('/api/reflections/search', jwt.tokenValidation()
  , (req: Request, res: Response) => reflectionGetByCriteriaController.run(req, res));

  const reflectionDeleteController = container.get('Apps.feedback.controllers.ReflectionDeleteController');
  router.delete('/api/reflections/:id', jwt.tokenValidation()
  , (req: Request, res: Response) => reflectionDeleteController.run(req, res));
};
