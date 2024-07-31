import { JwtMiddleware } from '@__feedback__/shared';
import { Express } from 'express';
import container from '../dependency-injection';
import { AuthController } from '../controllers/auth/AuthController';
import { AuthSignOutController } from '../controllers/auth/AuthSignOutController';

export const register = (app: Express) => {
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const statusGetController = container.get('Apps.feedback.controllers.StatusGetController');
  app.get('/api/auth/status', statusGetController.run.bind(statusGetController));

  const authController: AuthController = container.get('Apps.feedback.controllers.AuthController');
  app.post('/api/auth/login', AuthController.validator(), authController.run.bind(authController));

  const authSignOutController: AuthSignOutController = container.get('Apps.feedback.controllers.AuthSignOutController');
  app.post('/api/auth/signout', AuthController.validator(), authSignOutController.run.bind(authSignOutController));
  
  const authCurrentUserController: AuthController = container.get('Apps.feedback.controllers.AuthCurrentUserController');
  app.get('/api/auth/currentuser', jwt.tokenValidation(), authCurrentUserController.run.bind(authCurrentUserController));
};
