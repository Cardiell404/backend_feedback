import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { JwtMiddleware } from '@__feedback__/shared';

export const register = (router: Router) => {
  
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const conversationPostController = container.get('Apps.feedback.controllers.ConversationPostController');
  router.post('/api/conversations', jwt.tokenValidation(), (req: Request, res: Response) => conversationPostController.run(req, res));

  const conversationPutController = container.get('Apps.feedback.controllers.ConversationPutController');
  router.put('/api/conversations/:id', jwt.tokenValidation(), (req: Request, res: Response) => conversationPutController.run(req, res));

  const sendConversationController = container.get('Apps.feedback.controllers.SendConversationController');
  router.post('/api/conversations/:id/send', jwt.tokenValidation(), (req: Request, res: Response) => sendConversationController.run(req, res));

  const conversationGetByCriteriaController = container.get('Apps.feedback.controllers.ConversationGetByCriteriaController');
  router.post('/api/conversations/search', jwt.tokenValidation(), (req: Request, res: Response) => conversationGetByCriteriaController.run(req, res));

  const conversationDeleteController = container.get('Apps.feedback.controllers.ConversationDeleteController');
  router.delete('/api/conversations/:id', jwt.tokenValidation(), (req: Request, res: Response) => conversationDeleteController.run(req, res));
};
