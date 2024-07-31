import bodyParser from 'body-parser';
import compress from 'compression';
import cors from 'cors';
import express from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { ErrorHandler, Logger } from '@__feedback__/shared';
import container from './dependency-injection';
import { registerRoutes } from './routes';
import cookieSession from 'cookie-session';
export class Server {
  private express: express.Express;
  private port: string;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get('Shared.Logger');
    this.express = express();
    this.express.use(  cookieSession({
      signed: false,
      secure: process.env.NODE_ENV !== "test",
    }));
    this.express.use(cors({origin: ['http://localhost:3000', 'http://localhost:4200']}));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    const router = Router();
    this.express.use(ErrorHandler);
    this.express.use(router);

    registerRoutes(router);


  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `  Mock Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        this.logger.info('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
