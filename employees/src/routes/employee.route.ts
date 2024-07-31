import { Router, Request, Response } from 'express';
import { JwtMiddleware } from '@__feedback__/shared';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const jwt: JwtMiddleware = container.get('Shared.JwtMiddleware');

  const statusGetController = container.get('Apps.feedback.controllers.StatusGetController');
  router.get('/api/employees/status', (req: Request, res: Response) => statusGetController.run(req, res));
  
  const employeeGetByIdController = container.get('Apps.feedback.controllers.EmployeeGetByIdController');
  router.get('/api/employees/:id', jwt.tokenValidation(), (req: Request, res: Response) => employeeGetByIdController.run(req, res));

  const employeesGetByCriteriaController = container.get('Apps.feedback.controllers.EmployeesGetByCriteriaController');
  router.post('/api/employees/search' , (req: Request, res: Response) => employeesGetByCriteriaController.run(req, res));

  const employeePostController = container.get('Apps.feedback.controllers.EmployeePostController');
  router.post('/api/employees', (req: Request, res: Response) => employeePostController.run(req, res));

  const employeePutController = container.get('Apps.feedback.controllers.EmployeePutController');
  router.put('/api/employees/:id', jwt.tokenValidation(), (req: Request, res: Response) => employeePutController.run(req, res));

  const employeeDeleteByCriteriaController = container.get('Apps.feedback.controllers.EmployeeDeleteController');
  router.delete('/api/employees/:id', jwt.tokenValidation() , (req: Request, res: Response) => employeeDeleteByCriteriaController.run(req, res));

};
