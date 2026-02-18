import { InvalidStudentIdException } from '../exceptions/student-exceptions';
import {
  InvalidRequestBodyException,
  MissingRequestBodyException,
} from '../shared/errors/app-errors';
import { getMissingKeys, isObject, isValidID } from '../shared/utils';

export class GetStudentDTO {
  private constructor(public studentId: string) {}

  public static fromRequest(id: unknown) {
    if (!isValidID(id)) {
      throw new InvalidStudentIdException();
    }

    return new GetStudentDTO(id);
  }
}

export class CreateStudentDTO {
  private constructor(public studentName: string) {}

  public static fromRequest(body: unknown) {
    if (!isObject<{ name: string }>(body)) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['name'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { name } = body;

    return new CreateStudentDTO(name);
  }
}
