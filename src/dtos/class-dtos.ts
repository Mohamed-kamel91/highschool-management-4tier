import {
  InvalidClassIdException,
  MissingClassIdException,
} from '../exceptions/class-exceptions';
import {
  InvalidRequestBodyException,
  MissingRequestBodyException,
} from '../shared/errors/app-errors';
import { getMissingKeys, isObject, isValidID } from '../shared/utils';

class CreateClassDTO {
  private constructor(public name: string) {}

  public static fromRequest(body: unknown) {
    if (!isObject<{ name: string }>(body)) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['name'];
    const missingKeys = getMissingKeys(body, requiredKeys);
    console.log(missingKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { name } = body;

    return new CreateClassDTO(name);
  }
}

class EnrollStudentDTO {
  constructor(
    public studentId: string,
    public classId: string,
  ) {}

  public static fromRequest(body: unknown) {
    if (!isObject<{ studentId: string; classId: string }>(body)) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['studentId', 'classId'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(requiredKeys);
    }

    const { classId, studentId } = body;

    return new EnrollStudentDTO(studentId, classId);
  }
}

class ClassID {
  constructor(public classId: string) {}

  public static fromRequestParams(params: unknown) {
    const isValidParams =
      isObject<{ id: string }>(params) && 'id' in params;

    if (!isValidParams) {
      throw new MissingClassIdException();
    }

    const { id } = params;

    if (!isValidID(id)) {
      throw new InvalidClassIdException();
    }

    return new ClassID(id);
  }
}

export { CreateClassDTO, EnrollStudentDTO, ClassID };
