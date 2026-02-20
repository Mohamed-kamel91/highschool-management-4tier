import { StudentDatabase } from '../persistence';
import {
  GetStudentDTO,
  CreateStudentDTO,
  StudentID,
} from '../dtos/student-dto';
import { StudentNotFoundException } from '../exceptions/student-exceptions';

class StudentService {
  constructor(private studentDatabase: StudentDatabase) {}

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

  public async getAssignments(dto: StudentID) {
    const { id } = dto;

    const student = await this.studentDatabase.getById(id);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const assignments = await this.studentDatabase.getAssignments(id);

    return assignments;
  }

  public async getGrades(dto: StudentID) {
    const { id } = dto;

    const student = await this.studentDatabase.getById(id);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const grades = await this.studentDatabase.getGrades(id);

    return grades;
  }
}

export default StudentService;
