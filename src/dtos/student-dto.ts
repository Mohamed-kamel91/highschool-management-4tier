import { BadRequestError } from '../shared/errors/app-errors';
import { InvalidStudentIdError } from '../shared/errors/student-errors';
import { isMissingKeys, isUUID } from '../shared/utils';

export class GetStudentDTO {
  private constructor(public studentId: string) {}

  public static fromRequest(id: string | string[] | undefined) {
    if (!id || typeof id !== 'string' || !isUUID(id)) {
      throw new InvalidStudentIdError();
    }

    return new GetStudentDTO(id);
  }
}

export class CreateStudentDTO {
  private constructor(public studentName: string) {}

  public static fromRequest(body: unknown) {
    const requiredKeys = ['name'];
    const invalidRequest =
      !body ||
      typeof body !== 'object' ||
      isMissingKeys(body, requiredKeys);

    if (invalidRequest) {
      throw new BadRequestError('Invalid request body');
    }

    const { name } = body as { name: string };

    return new CreateStudentDTO(name);
  }
}
