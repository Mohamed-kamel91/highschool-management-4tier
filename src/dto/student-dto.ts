import { AppError } from '../errors/app-errors';
import { InvalidStudentIdError } from '../errors/student-errors';
import { isUUID } from '../utils';

export class GetStudentDTO {
  private constructor(public studentId: string) {}

  public static fromRequest(id: string | string[] | undefined) {
    if (!id || typeof id !== 'string' || !isUUID(id)) {
      throw new InvalidStudentIdError();
    }

    return new GetStudentDTO(id);
  }
}
