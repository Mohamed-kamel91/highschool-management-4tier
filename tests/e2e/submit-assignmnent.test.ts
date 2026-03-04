import path from 'path';

import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { StudentAssignment } from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import { StudentBuilder } from '../fixtures/student-builder';
import { AssignmentBuilder } from '../fixtures/assignment-builder';
import { ClassroomBuilder } from '../fixtures/classroom-builder';
import { ClassEnrollmentBuilder } from '../fixtures/class-enrollment-builder';
import { StudentAssignmentBuilder } from '../fixtures/student-assignment-builder';
import { AssignmentSubmissionBuilder } from '../fixtures/assignment-submission-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/submit_assignment.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Successfully submit an assignment', ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let studentAssignment: StudentAssignment;

    given('I was assigned an assignment', async () => {
      const studentBuilder = new StudentBuilder();
      const classroomBuilder = new ClassroomBuilder();

      const classEnrollment = new ClassEnrollmentBuilder()
        .from(classroomBuilder)
        .and(studentBuilder);

      const assignmentBuilder = new AssignmentBuilder().from(
        classroomBuilder,
      );

      studentAssignment = await new StudentAssignmentBuilder()
        .from(classEnrollment)
        .and(assignmentBuilder)
        .build();
    });

    when('I submit my assignment', async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
      };

      response = await request(app)
        .post('/student-assignments/submit')
        .send(requestBody);
    });

    then('it should be successfully submitted', () => {
      expect(response.status).toBe(201);
    });
  });

  test('Submit an assignment already submitted', ({
    given,
    when,
    then,
    and,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let studentAssignment: StudentAssignment;

    given('I have already submitted an assignment', async () => {
      const studentBuilder = new StudentBuilder();
      const classroomBuilder = new ClassroomBuilder();

      const classEnrollment = new ClassEnrollmentBuilder()
        .from(classroomBuilder)
        .and(studentBuilder);

      const assignmentBuilder = new AssignmentBuilder().from(
        classroomBuilder,
      );

      const studentAssignmentBuilder = new StudentAssignmentBuilder()
        .from(classEnrollment)
        .and(assignmentBuilder);

      const assignmentSubmissionResult =
        await new AssignmentSubmissionBuilder()
          .from(studentAssignmentBuilder)
          .build();

      studentAssignment =
        assignmentSubmissionResult.studentAssignment;
    });

    when('I submit the assignment again', async () => {
      requestBody = {
        studentId: studentAssignment.studentId,
        assignmentId: studentAssignment.assignmentId,
      };

      response = await request(app)
        .post('/student-assignments/submit')
        .send(requestBody);
    });

    then('It should not be submitted again', () => {
      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
    });

    and('I should receive an error message', () => {
      expect(response.body.error).toBe('AssignmentAlreadySubmitted');
    });
  });
});
