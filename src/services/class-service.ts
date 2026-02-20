import { ClassDatabase, StudentDatabase } from '../persistence';

import {
  ClassID,
  CreateClassDTO,
  EnrollStudentDTO,
} from '../dtos/class-dtos';
import { ClassNotFoundException } from '../exceptions/class-exceptions';
import {
  StudentAlreadyEnrolledException,
  StudentNotFoundException,
} from '../exceptions/student-exceptions';

class ClassService {
  constructor(
    private classDatabase: ClassDatabase,
    private studentDatabase: StudentDatabase,
  ) {}

  public async createClass(dto: CreateClassDTO) {
    const { name } = dto;

    const cls = await this.classDatabase.save(name);

    if (!cls) {
      throw new ClassNotFoundException();
    }

    return cls;
  }

  public async enrollStudent(dto: EnrollStudentDTO) {
    const { classId, studentId } = dto;

    const student = await this.studentDatabase.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const cls = await this.classDatabase.getById(classId);

    if (!cls) {
      throw new ClassNotFoundException();
    }

    const isStudentEnrolled = await this.classDatabase.getEnrollment(
      classId,
      studentId,
    );

    if (isStudentEnrolled) {
      throw new StudentAlreadyEnrolledException();
    }

    const enrollment = await this.classDatabase.saveEnrollment(
      classId,
      studentId,
    );

    return enrollment;
  }

  public async getAssignments(dto: ClassID) {
    const { classId } = dto;

    const cls = await this.classDatabase.getAssignments(classId);

    if (!cls) {
      throw new ClassNotFoundException();
    }

    const assignments =
      await this.classDatabase.getAssignments(classId);

    return assignments;
  }
}

export default ClassService;
