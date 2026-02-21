import { AssignmentDatabase, StudentDatabase } from '../persistence';
import {
  AssignmentID,
  AssignStudentDTO,
  CreateAssignmentDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from '../dtos/assignment-dtos';
import {
  AssignmentNotFoundException,
  StudentAssignmentNotFoundException,
} from '../exceptions/assignment-exceptions';
import { StudentNotFoundException } from '../exceptions/student-exceptions';

class AssignmentService {
  constructor(
    private assignmentDatabase: AssignmentDatabase,
    private studentDatabase: StudentDatabase,
  ) {}

  public async createAssignment(dto: CreateAssignmentDTO) {
    const { classId, title } = dto;

    const assignment = await this.assignmentDatabase.save(
      classId,
      title,
    );

    return assignment;
  }

  public async getAssignment(dto: AssignmentID) {
    const { id } = dto;

    const assignment = await this.assignmentDatabase.getById(id);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    return assignment;
  }

  public async assignStudent(dto: AssignStudentDTO) {
    const { studentId, assignmentId } = dto;

    const student = await this.studentDatabase.getById(studentId);

    if (!student) {
      throw new StudentNotFoundException();
    }

    const assignment =
      await this.assignmentDatabase.getById(assignmentId);

    if (!assignment) {
      throw new AssignmentNotFoundException();
    }

    const studentAssignment =
      await this.assignmentDatabase.addStudent(
        assignmentId,
        studentId,
      );

    return studentAssignment;
  }

  public async submitAssignment(dto: SubmitAssignmentDTO) {
    const { studentId, assignmentId } = dto;

    const assignment =
      await this.assignmentDatabase.getStudentAssignment(
        assignmentId,
        studentId,
      );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const submittedAssignment = await this.assignmentDatabase.submit(
      assignment.id,
    );

    return submittedAssignment;
  }

  public async gradeAssignment(dto: GradeAssignmentDTO) {
    const { studentId, assignmentId, grade } = dto;

    const assignment =
      await this.assignmentDatabase.getStudentAssignment(
        assignmentId,
        studentId,
      );

    if (!assignment) {
      throw new StudentAssignmentNotFoundException();
    }

    const GradedAssignment = await this.assignmentDatabase.grade(
      assignment.id,
      grade,
    );

    return GradedAssignment;
  }
}

export default AssignmentService;
