import { NextFunction, Request, Response } from 'express';
import { JwtImplement } from '../domain/JwtImplement';

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

export class JwtMiddleware {

  constructor(private jwt: JwtImplement) {}

  tokenValidation() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.session?.jwt) {
        return next();
      }
      try {
        const payload = this.jwt.ValidateJWT(req.session.jwt)
        req.currentUser = payload;
      } catch (error) {
        console.log(error);
      }
      next();
    }
  }
}