import { Logger } from '../domain/Logger';
export declare class WinstonLogger implements Logger {
    private logger;
    constructor();
    debug(message: string): void;
    error(message: string | Error): void;
    info(message: string): void;
}
