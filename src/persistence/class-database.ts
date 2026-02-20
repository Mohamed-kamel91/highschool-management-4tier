import { PrismaClient } from '../../generated/prisma/client';

interface ClassPersistence {
  getById(id: string): Promise<any>;
  save(name: string): Promise<any>;
  getAssignments(classId: string): Promise<any>;
  saveEnrollment(classId: string, studentId: string): Promise<any>;
}

class ClassDatabase implements ClassPersistence {
  constructor(private prisma: PrismaClient) {}

  public async save(name: string) {
    const data = await this.prisma.class.create({
      data: {
        name,
      },
    });

    return data;
  }

  public async getById(id: string) {
    const data = await this.prisma.class.findUnique({
      where: { id },
    });

    return data;
  }

  public async getEnrollment(classId: string, studentId: string) {
    const data = await this.prisma.classEnrollment.findFirst({
      where: {
        studentId,
        classId,
      },
    });

    return data;
  }

  public async saveEnrollment(classId: string, studentId: string) {
    const data = await this.prisma.classEnrollment.create({
      data: {
        studentId,
        classId,
      },
    });

    return data;
  }

  public async getAssignments(classId: string) {
    const data = await this.prisma.assignment.findMany({
      where: {
        classId: classId,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return data;
  }
}

export default ClassDatabase;
