import { CustomError } from "../errors";
export declare class InvalidArgumentError extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErrors(): {
        message: string;
    }[];
}
