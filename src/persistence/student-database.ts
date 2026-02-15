import { PrismaClient } from '../../generated/prisma/client';

export class StudentDatabase {
  constructor(private prisma: PrismaClient) {}

  public async getStudentById(id: string) {
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
}
