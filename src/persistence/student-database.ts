import { PrismaClient } from '../../generated/prisma/client';

interface StudentPersistence {
  save(name: string): any;
  getById(name: string): any;
}

export class StudentDatabase implements StudentPersistence {
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
}
