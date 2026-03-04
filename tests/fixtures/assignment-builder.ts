import { faker } from '@faker-js/faker';

import { Assignment } from '../../generated/prisma/client';
import { prisma } from '../../src/database';
import { ClassroomBuilder } from './classroom-builder';

export class AssignmentBuilder {
  private assignment: Partial<Assignment> = {
    title: faker.lorem.word(),
  };

  private classroomBuilder?: ClassroomBuilder;

  public wihTitle(title: string) {
    this.assignment.title = title;
    return this;
  }

  public from(ClassroomBuilder: ClassroomBuilder) {
    this.classroomBuilder = ClassroomBuilder;
    return this;
  }

  public async build() {
    if (!this.classroomBuilder)
      throw new Error('classroomBuilder not defined');

    const classroom = await this.classroomBuilder.build();
    const assignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title as string,
        classId: classroom.id,
      },
    });

    return { assignment, classroom };
  }
}
