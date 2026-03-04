import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { Assignment, Student } from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import { ClassroomBuilder } from '../fixtures/classroom-builder';
import { AssignmentBuilder } from '../fixtures/assignment-builder';
import { ClassEnrollmentBuilder } from '../fixtures/class-enrollment-builder';
import { StudentBuilder } from '../fixtures/student-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/assign_student_to_assignment.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Assign a student to an assignment', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    let student: Student;
    let assignment: Assignment;

    given(
      /^A student is enrolled to a class with name "(.*)"$/,
      async (classroomName) => {
        const studentBuilder = new StudentBuilder();
        const classroomBuilder = new ClassroomBuilder().withName(
          classroomName,
        );

        const enrollmentResult = await new ClassEnrollmentBuilder()
          .from(classroomBuilder)
          .and(studentBuilder)
          .build();

        student = enrollmentResult.student;
      },
    );

    and(
      /^an assignment exists for the class "(.*)"$/,
      async (classroomName) => {
        const classroomBuilder = new ClassroomBuilder().withName(
          classroomName,
        );

        const assignmentResult = await new AssignmentBuilder()
          .from(classroomBuilder)
          .build();

        assignment = assignmentResult.assignment;
      },
    );

    when('I assign the student the assignment', async () => {
      requestBody = {
        studentId: student.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then('the student should be assigned to the assignment', () => {
      expect(response.status).toBe(201);
      expect(response.body.data.studentId).toBe(
        requestBody.studentId,
      );
      expect(response.body.data.assignmentId).toBe(
        requestBody.assignmentId,
      );
    });
  });

  test('Student is not enrolled to the class', ({
    given,
    and,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    let assignment: Assignment;
    let unenrolledStudent: Student;

    given('A student is not enrolled to a class', async () => {
      unenrolledStudent = await new StudentBuilder().build();
    });

    and('an assignment exists for the class', async () => {
      const classroomBuilder = new ClassroomBuilder();
      const assignmentResult = await new AssignmentBuilder()
        .from(classroomBuilder)
        .build();

      assignment = assignmentResult.assignment;
    });

    when('I assign the student to the assignment', async () => {
      requestBody = {
        studentId: unenrolledStudent.id,
        assignmentId: assignment.id,
      };

      response = await request(app)
        .post('/student-assignments')
        .send(requestBody);
    });

    then(
      'the student should not be assigned to the assignment',
      () => {
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toBe('StudentNotEnrolled');
      },
    );
  });
});
