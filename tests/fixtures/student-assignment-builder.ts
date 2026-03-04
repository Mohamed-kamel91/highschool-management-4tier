import { prisma } from '../../src/database';
import { AssignmentBuilder } from './assignment-builder';
import { ClassEnrollmentBuilder } from './class-enrollment-builder';

export class StudentAssignmentBuilder {
  private assignmentBuilder?: AssignmentBuilder;
  private classEnrollmentBuilder?: ClassEnrollmentBuilder;

  public from(classEnrollmentBuilder: ClassEnrollmentBuilder) {
    this.classEnrollmentBuilder = classEnrollmentBuilder;
    return this;
  }

  public and(assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  public async build() {
    if (!this.classEnrollmentBuilder)
      throw new Error('you must define the class enrollment builder');

    if (!this.assignmentBuilder)
      throw new Error('you must define the assignment builder');

    const { assignment } = await this.assignmentBuilder.build();
    const { student } = await this.classEnrollmentBuilder.build();

    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: student.id,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }
}
