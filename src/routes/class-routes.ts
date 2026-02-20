import { BaseRouter } from '../base-router';
import { ClassController } from '../controllers';

export class ClassRouter extends BaseRouter {
  public readonly basePath: string = '/classes';

  constructor(private controller: ClassController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createClass);
    this.router.post('/enrollments', this.controller.enrollStudent);
    this.router.get('/:id/assignments', this.controller.getAssignments);
  }
}
