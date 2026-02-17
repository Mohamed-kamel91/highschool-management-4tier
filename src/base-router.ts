import { Router } from 'express';

export abstract class BaseRouter {
  protected router: Router;

  public abstract readonly basePath: string;
  protected abstract setupRoutes(): void;

  constructor() {
    this.router = Router();
  }

  /* Ensure routes are ready
    (never call abstract method in parent constuctor
    cause at the time the child class field are not initialized yet "undefined")
    in parent constructor controller would be "undefined" */
  public getRouter(): Router {
    return this.router;
  }

  public register() {
    this.setupRoutes();
  }
}
