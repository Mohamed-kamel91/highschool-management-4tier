import {
  InvalidAssignmentIdException,
  MissingAssignmentIdException,
} from '../exceptions/assignment-exceptions';
import {
  InvalidRequestBodyException,
  MissingRequestBodyException,
} from '../shared/errors/app-errors';
import { getMissingKeys, isObject, isValidID } from '../shared/utils';

export class CreateAssignmentDTO {
  private constructor(
    public classId: string,
    public title: string,
  ) {}

  public static fromRequest(body: unknown) {
    if (!isObject<{ classId: string; title: string }>(body)) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['classId', 'title'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { classId, title } = body;

    return new CreateAssignmentDTO(classId, title);
  }
}

export class AssignmentID {
  constructor(public id: string) {}

  public static fromRequestParams(params: unknown) {
    const isValidParams =
      isObject<{ id: string }>(params) && 'id' in params;

    if (!isValidParams) {
      throw new MissingAssignmentIdException();
    }

    const { id } = params;

    if (!isValidID(id)) {
      throw new InvalidAssignmentIdException();
    }

    return new AssignmentID(id);
  }
}

export class AssignStudentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
  ) {}

  public static fromRequest(body: unknown) {
    if (
      !isObject<{ studentId: string; assignmentId: string }>(body)
    ) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['studentId', 'assignmentId'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { studentId, assignmentId } = body;

    return new AssignStudentDTO(studentId, assignmentId);
  }
}

export class SubmitAssignmentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
  ) {}

  public static fromRequest(body: unknown) {
    if (
      !isObject<{ studentId: string; assignmentId: string }>(body)
    ) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['studentId', 'assignmentId'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { studentId, assignmentId } = body;

    return new SubmitAssignmentDTO(studentId, assignmentId);
  }
}

export class GradeAssignmentDTO {
  constructor(
    public studentId: string,
    public assignmentId: string,
    public grade: string,
  ) {}

  public static fromRequest(body: unknown) {
    if (
      !isObject<{
        studentId: string;
        assignmentId: string;
        grade: string;
      }>(body)
    ) {
      throw new MissingRequestBodyException();
    }

    const requiredKeys = ['studentId', 'assignmentId', 'grade'];
    const missingKeys = getMissingKeys(body, requiredKeys);

    if (missingKeys.length > 0) {
      throw new InvalidRequestBodyException(missingKeys);
    }

    const { studentId, assignmentId, grade } = body;

    return new GradeAssignmentDTO(studentId, assignmentId, grade);
  }
}
