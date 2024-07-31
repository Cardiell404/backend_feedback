import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { JwtMiddleware } from '@__feedback__/shared';

export const register = (router: Router) => {
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const statusGetController = container.get('Apps.feedback.controllers.StatusGetController');
  router.get('/api/goals/status', (req: Request, res: Response) => statusGetController.run(req, res));

  const goalPostController = container.get('Apps.feedback.controllers.GoalPostController');
  router.post('/api/goals', jwt.tokenValidation(), (req: Request, res: Response) => goalPostController.run(req, res));

  const goalGetByIdController = container.get('Apps.feedback.controllers.GoalGetByIdController');
  router.get('/api/goals/:id', jwt.tokenValidation(), (req: Request, res: Response) => goalGetByIdController.run(req, res));

  const goalPutController = container.get('Apps.feedback.controllers.GoalPutController');
  router.put('/api/goals/:id', jwt.tokenValidation(), (req: Request, res: Response) => goalPutController.run(req, res));

  const goalsGetByCriteriaController = container.get('Apps.feedback.controllers.GoalsGetByCriteriaController');
  router.post('/api/goals/search', jwt.tokenValidation(), (req: Request, res: Response) => goalsGetByCriteriaController.run(req, res));

  const goalDeleteController = container.get('Apps.feedback.controllers.GoalDeleteController');
  router.delete('/api/goals/:id', jwt.tokenValidation(), (req: Request, res: Response) => goalDeleteController.run(req, res));

};
