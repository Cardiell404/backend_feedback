import { Request, Response } from 'express';

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
export interface Controller {
  run(req: Request, res: Response): Promise<void>;
}
