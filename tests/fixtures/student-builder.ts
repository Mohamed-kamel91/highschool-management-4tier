import { faker } from '@faker-js/faker';

import { Student } from '../../generated/prisma/client';
import { prisma } from '../../src/database';

export class StudentBuilder {
  private student: Partial<Student> = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
  };

  public withName(name: string) {
    this.student.name = name;
    return this;
  }

  public withEmail(email: string) {
    this.student.email = email;
    return this;
  }

  public async build() {
    const student = await prisma.student.create({
      
      data: {
        email: this.student.email as string,
        name: this.student.name as string,
      },
    });

    return student;
  }
}
