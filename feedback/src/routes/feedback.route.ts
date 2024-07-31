import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { JwtMiddleware } from '@__feedback__/shared';

export const register = (router: Router) => {
  
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const feedbackPostController = container.get('Apps.feedback.controllers.FeedbackPostController');
  router.post('/api/feedback', jwt.tokenValidation(), (req: Request, res: Response) => feedbackPostController.run(req, res));

  const feedbackPutController = container.get('Apps.feedback.controllers.FeedbackPutController');
  router.put('/api/feedback/:id', jwt.tokenValidation(), (req: Request, res: Response) => feedbackPutController.run(req, res));

  const sendFeedbackController = container.get('Apps.feedback.controllers.SendFeedbackController');
  router.post('/api/feedback/:id/send', jwt.tokenValidation(), (req: Request, res: Response) => sendFeedbackController.run(req, res));

  const feedbackGetByCriteriaController = container.get('Apps.feedback.controllers.FeedbackGetByCriteriaController');
  router.post('/api/feedback/search', jwt.tokenValidation(), (req: Request, res: Response) => feedbackGetByCriteriaController.run(req, res));

  const feedbackDeleteController = container.get('Apps.feedback.controllers.FeedbackDeleteController');
  router.delete('/api/feedback/:id', jwt.tokenValidation(), (req: Request, res: Response) => feedbackDeleteController.run(req, res));
};
