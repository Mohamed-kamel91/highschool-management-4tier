import { faker } from '@faker-js/faker';

import { prisma } from '../../src/database';
import { AssignmentSubmission } from '../../generated/prisma/client';
import { StudentAssignmentBuilder } from './student-assignment-builder';

export class AssignmentSubmissionBuilder {
  private assignmentSubmission: Partial<AssignmentSubmission> = {
    submissionContent: faker.word.words(),
  };

  private studentAssignmentBuilder?: StudentAssignmentBuilder;

  from(studentAssignmentBuilder: StudentAssignmentBuilder) {
    this.studentAssignmentBuilder = studentAssignmentBuilder;
    return this;
  }

  async build() {
    if (!this.studentAssignmentBuilder)
      throw new Error(
        'You must define the student assignment builder',
      );
      
    const studentAssignment =
      await this.studentAssignmentBuilder.build();

    const assignmentSubmission =
      await prisma.assignmentSubmission.create({
        data: {
          studentAssignmentId: studentAssignment.id,
          submissionContent:
            this.assignmentSubmission.submissionContent,
        },
      });

    return { assignmentSubmission, studentAssignment };
  }
}
