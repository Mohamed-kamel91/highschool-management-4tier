import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { Class, Student } from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import { ClassroomBuilder } from '../fixtures/classroom-builder';
import { StudentBuilder } from '../fixtures/student-builder';
import { ClassEnrollmentBuilder } from '../fixtures/class-enrollment-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/create-enrollment.feature',
  ),
);
defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Successfully enroll a student to a class', ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};

    given('a class and a student exist', async () => {
      const student = await new StudentBuilder().build();
      const classroom = await new ClassroomBuilder().build();

      requestBody = {
        studentId: student.id,
        classId: classroom.id,
      };
    });

    when('I enroll the student to the class', async () => {
      response = await request(app)
        .post('/class-enrollments')
        .send(requestBody);
    });

    then(
      'the student should be enrolled to the class successfully',
      () => {
        expect(response.status).toBe(201);
        expect(response.body.data.classId).toBe(requestBody.classId);
        expect(response.body.data.studentId).toBe(
          requestBody.studentId,
        );
      },
    );
  });

  test('Student already enrolled to a class', ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let student: Student;
    let classroom: Class;

    given('a student is already enrolled to a class', async () => {
      const classroomBuilder = new ClassroomBuilder();
      const studentBuilder = new StudentBuilder();
      const enrollmentResult = await new ClassEnrollmentBuilder()
        .from(classroomBuilder)
        .and(studentBuilder)
        .build();

      classroom = enrollmentResult.classroom;
      student = enrollmentResult.student;
    });

    when('I enroll the student to the class again', async () => {
      requestBody = {
        classId: classroom.id,
        studentId: student.id,
      };

      response = await request(app)
        .post('/class-enrollments')
        .send(requestBody);
    });

    then('the class enrollment should not be created', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe('StudentAlreadyEnrolled');
      expect(response.body.success).toBe(false);
    });
  });
});
