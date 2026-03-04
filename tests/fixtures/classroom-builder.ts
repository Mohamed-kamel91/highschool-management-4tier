import { faker } from '@faker-js/faker';

import { Class } from '../../generated/prisma/client';
import { prisma } from '../../src/database';

export class ClassroomBuilder {
  private classroom: Partial<Class> = {
    name: faker.company.buzzNoun(),
  };

  public withName(name: string) {
    this.classroom.name = name;
    return this;
  }

  public async build() {
    const classroom = await prisma.class.upsert({
      where: {
        name: this.classroom.name as string,
      },
      create: {
        name: this.classroom.name as string,
      },
      update: {
        name: this.classroom.name as string,
      },
    });

    return classroom;
  }
}
