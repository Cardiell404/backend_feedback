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
export declare class JwtMiddleware {
    private jwt;
    constructor(jwt: JwtImplement);
    tokenValidation(): (req: Request, res: Response, next: NextFunction) => void;
}
export {};
