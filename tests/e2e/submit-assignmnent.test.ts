import path from 'path';

import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { StudentAssignment } from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import {
  aClassRoom,
  anAssignment,
  anAssignmentSubmission,
  anEnrolledStudent,
  aStudent,
  aStudentAssigment,
} from '../fixtures';

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
      const classroomBuilder = aClassRoom();

      studentAssignment = await aStudentAssigment()
        .from(
          anEnrolledStudent().from(classroomBuilder).and(aStudent()),
        )
        .and(anAssignment().from(classroomBuilder))
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
      const classroomBuilder = aClassRoom();

      const submissionResult = await anAssignmentSubmission()
        .from(
          aStudentAssigment()
            .from(
              anEnrolledStudent()
                .from(classroomBuilder)
                .and(aStudent()),
            )
            .and(anAssignment().from(classroomBuilder)),
        )
        .build();

      studentAssignment = submissionResult.studentAssignment;
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
