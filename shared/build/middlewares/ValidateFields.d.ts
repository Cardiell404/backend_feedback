import { Request } from 'express';
import { ValidationError } from 'express-validator';
export declare abstract class ValidateFields {
    protected validateRequest(req: Request): Array<ValidationError>;
}
