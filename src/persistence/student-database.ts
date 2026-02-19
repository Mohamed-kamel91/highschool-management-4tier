import { PrismaClient } from '../../generated/prisma/client';

interface StudentPersistence {
  save(name: string): any;
  getById(name: string): any;
  getAll(): any;
}

class StudentDatabase implements StudentPersistence {
  constructor(private prisma: PrismaClient) {}

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

  public async save(name: string) {
    const data = await this.prisma.student.create({
      data: {
        name,
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
}

export default StudentDatabase;
