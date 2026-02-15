import { StudentDatabase } from '../persistence/student-database';

import { CreateStudentDTO, GetStudentDTO } from '../dtos/student-dto';
import { StudentNotFoundError } from '../errors/student-errors';
import { InternalServerError } from '../errors/app-errors';

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

  public async createStudent(dto: CreateStudentDTO) {
    const { studentName } = dto;
    try {
      const student =
        await this.studentDatabase.createStudent(studentName);

      return student;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}
