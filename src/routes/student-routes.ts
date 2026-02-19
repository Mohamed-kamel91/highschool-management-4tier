import { BaseRouter } from '../base-router';
import { StudentController } from '../controllers';

export class StudentRouter extends BaseRouter {
  public readonly basePath: string = '/students';

  constructor(private controller: StudentController) {
    super();
  }

  protected setupRoutes(): void {
    this.router.post('/', this.controller.createStudent);
    this.router.get('/', this.controller.getAllStudents);
    this.router.get('/:id', this.controller.getStudent);
  }
}
