import { PrismaClient } from '../../generated/prisma/client';

interface AssignmentPersistence {
  save(classId: string, title: string): Promise<any>;
  getById(id: string): Promise<any>;
  addStudent(assignmentId: string, studentId: string): Promise<any>;
  getStudentAssignment(
    assignmentId: string,
    studentId: string,
  ): Promise<any>;
  submit(classId: string): Promise<any>;
  grade(classId: string, grade: string): Promise<any>;
}

class AssignmentDatabase implements AssignmentPersistence {
  constructor(private prisma: PrismaClient) {}

  public async save(classId: string, title: string) {
    const data = await this.prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.assignment.findUnique({
      where: {
        id,
      },
    });

    return data;
  }

  public async addStudent(assignmentId: string, studentId: string) {
    const data = await this.prisma.studentAssignment.create({
      data: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  public async getStudentAssignment(
    assignmentId: string,
    studentId: string,
  ) {
    const data = await this.prisma.studentAssignment.findFirst({
      where: {
        assignmentId,
        studentId,
      },
    });

    return data;
  }

  public async submit(classId: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id: classId,
      },
      data: {
        status: 'SUBMITTED',
      },
    });

    return data;
  }

  public async grade(classId: string, grade: string) {
    const data = await this.prisma.studentAssignment.update({
      where: {
        id: classId,
      },
      data: {
        grade,
      },
    });

    return data;
  }
}

export default AssignmentDatabase;
