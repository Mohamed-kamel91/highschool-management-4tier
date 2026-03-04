import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import {
  Class,
  ClassEnrollment,
  Student,
} from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import { aClassRoom, anEnrolledStudent, aStudent } from '../fixtures';

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

    let student: Student;
    let classroom: Class;

    given('a class and a student exist', async () => {
      student = await aStudent().build();
      classroom = await aClassRoom().build();
    });

    when('I enroll the student to the class', async () => {
      requestBody = {
        studentId: student.id,
        classId: classroom.id,
      };

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

    let classEnrollment: ClassEnrollment;

    given('a student is already enrolled to a class', async () => {
      const enrollmentResult = await anEnrolledStudent()
        .from(aClassRoom())
        .and(aStudent())
        .build();

      classEnrollment = enrollmentResult.enrollment;
    });

    when('I enroll the student to the class again', async () => {
      requestBody = {
        classId: classEnrollment.classId,
        studentId: classEnrollment.studentId,
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
