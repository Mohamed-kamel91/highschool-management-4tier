import { StudentDatabase } from '../persistence';
import { GetStudentDTO, CreateStudentDTO } from '../dtos/student-dto';
import { StudentNotFoundException } from '../exceptions/student-exceptions';

class StudentService {
  private studentDatabase: StudentDatabase;

  constructor(studentDatabase: StudentDatabase) {
    this.studentDatabase = studentDatabase;
  }

  public async getStudent(dto: GetStudentDTO) {
    const { studentId } = dto;

    const student = await this.studentDatabase.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    return student;
  }

  public async createStudent(dto: CreateStudentDTO) {
    const { studentName } = dto;

    const student = await this.studentDatabase.save(studentName);

    return student;
  }

  public async getAllStudents() {
    const students = await this.studentDatabase.getAll();

    return students;
  }
}

export default StudentService;
