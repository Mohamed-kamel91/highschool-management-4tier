import { faker } from '@faker-js/faker';

import { Assignment } from '../../generated/prisma/client';
import { prisma } from '../../src/database';
import { ClassroomBuilder } from './classroom-builder';
import { StudentBuilder } from './student-builder';

export class ClassEnrollmentBuilder {
  private assignment: Partial<Assignment> = {
    title: faker.lorem.word(),
  };
  
  private classroomBuilder?: ClassroomBuilder;
  private studentBuilder?: StudentBuilder;


  public wihTitle(title: string) {
    this.assignment.title = title;
    return this;
  }

  public from(ClassroomBuilder: ClassroomBuilder) {
    this.classroomBuilder = ClassroomBuilder;
    return this;
  }

  public and(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }

  public async build() {
    if (!this.classroomBuilder)
      throw new Error('classroomBuilder not defined');

    if (!this.studentBuilder)
      throw new Error('studentBuilder not defined');

    const classroom = await this.classroomBuilder.build();
    const student = await this.studentBuilder.build();

    const enrollment = await prisma.classEnrollment.create({
      data: {
        classId: classroom.id,
        studentId: student.id,
      },
    });

    return { enrollment, student, classroom };
  }
}
