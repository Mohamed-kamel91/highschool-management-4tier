import { Server as HttpServer } from 'http';
import express, { Express } from 'express';
import cors from 'cors';

import { errorMiddlewareHandler } from './shared/errors/error-middleware';

import { StudentRouter } from './routes/student-routes';

class Server {
  private readonly _app: Express;

  get app(): Express {
    return this._app;
  }

  constructor(private studentRouter: StudentRouter) {
    this._app = express();
    this.addMiddlewares();
    this.registerRoutes();
    this.errorMiddlware();
  }

  private addMiddlewares() {
    this._app.use(express.json());
    this._app.use(cors());
  }

  private registerRoutes() {
    const routers = [this.studentRouter];

    routers.forEach((router) => {
      router.register();
      this._app.use(router.basePath, router.getRouter());
    });
  }

  private errorMiddlware() {
    this._app.use(errorMiddlewareHandler);
  }

  public start(port: number) {
    const server = this._app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    this.enableGracefulShutdown(server);
  }

  private enableGracefulShutdown(httpServer: HttpServer): void {
    const gracefulShutdown = () => {
      console.log('Received kill signal, shutting down gracefully');
      httpServer.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
      });

      setTimeout(() => {
        console.error(
          'Could not close connections in time, forcefully shutting down',
        );
        process.exit(1);
      }, 10000);
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  }
}

export default Server;
