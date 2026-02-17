import { StudentDatabase } from '../persistence/student-database';
import { GetStudentDTO, CreateStudentDTO } from '../dtos/student-dto';

import { StudentNotFoundError } from '../shared/errors/student-errors';
import { InternalServerError } from '../shared/errors/app-errors';

class StudentService {
  private studentDatabase: StudentDatabase;

  constructor(studentDatabase: StudentDatabase) {
    this.studentDatabase = studentDatabase;
  }

  public async getStudent(dto: GetStudentDTO) {
    const { studentId } = dto;

    try {
      const student = await this.studentDatabase.getById(studentId);

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
      const student = await this.studentDatabase.save(studentName);

      return student;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

export default StudentService;
