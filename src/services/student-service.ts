import { StudentDatabase } from '../persistence/student-database';

import { GetStudentDTO } from '../dto/student-dto';
import { StudentNotFoundError } from '../errors/student-errors';
import { AppError, InternalServerError } from '../errors/app-errors';

import { Result } from '../types';

export class StudentService {
  private studentDatabase: StudentDatabase;

  constructor(studentDatabase: StudentDatabase) {
    this.studentDatabase = studentDatabase;
  }

  public async getStudent(dto: GetStudentDTO) {
    const { studentId } = dto;

    try {
      const student =
        await this.studentDatabase.getStudentById(studentId);

      if (!student) {
        throw new StudentNotFoundError();
      }

      return student;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}
