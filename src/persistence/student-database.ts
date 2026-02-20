import { PrismaClient } from '../../generated/prisma/client';

interface StudentPersistence {
  save(name: string): Promise<any>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  getAssignments(id: string): Promise<any>;
  getGrades(id: string): Promise<any>;
}

class StudentDatabase implements StudentPersistence {
  constructor(private prisma: PrismaClient) {}

  public async save(name: string) {
    const data = await this.prisma.student.create({
      data: {
        name,
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    return data;
  }

  public async getAll() {
    const data = await this.prisma.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return data;
  }

  public async getAssignments(id: string) {
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
        status: 'SUBMITTED',
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }

  public async getGrades(id: string) {
    const data = await this.prisma.studentAssignment.findMany({
      where: {
        studentId: id,
      },
      include: {
        assignment: true,
      },
    });

    return data;
  }
}

export default StudentDatabase;
