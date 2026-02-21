import {
  InvalidStudentIdException,
  MissingStudentIdException,
} from '../exceptions/student-exceptions';
import {
  InvalidRequestBodyException,
  MissingRequestBodyException,
} from '../shared/errors/app-errors';
import { getMissingKeys, isObject, isValidID } from '../shared/utils';

export class StudentID {
  constructor(public id: string) {}

  static fromRequestParams(params: unknown) {
    const isValidParams =
      isObject<{ id: string }>(params) && 'id' in params;

    if (!isValidParams) {
      throw new MissingStudentIdException();
    }

    const { id } = params;

    if (!isValidID(id)) {
      throw new InvalidStudentIdException();
    }

    return new StudentID(id);
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

export class getStudentGradestDTO {
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

    return new getStudentGradestDTO(name);
  }
}
