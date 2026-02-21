import { BaseRouter } from '../base-router';
import { AssignmentController } from '../controllers';

export class AssignmentRouter extends BaseRouter {
  public readonly basePath: string = '/assignments';

  constructor(private controller: AssignmentController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createAssignment);
    this.router.get('/:id', this.controller.getAssignment);
  }
}

export class StudentAssignmentRouter extends BaseRouter {
  public readonly basePath: string = '/student-assignments';

  constructor(private controller: AssignmentController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.assignStudent);
    this.router.post('/submit', this.controller.submitAssignment);
    this.router.post('/grade', this.controller.gradeAssignment);
  }
}
