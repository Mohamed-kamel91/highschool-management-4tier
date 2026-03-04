import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { Class } from '../../generated/prisma/client';
import { resetDatabase } from '../fixtures/reset';
import { ClassroomBuilder } from '../fixtures/classroom-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/create_assignment.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Successfully create an assignment', ({
    given,
    when,
    then,
  }) => {
    let requestBody: any = {};
    let response: any = {};
    let classroom: Class;

    given(/^a classroom with name "(.*)" exists$/, async (name) => {
      classroom = await new ClassroomBuilder().withName(name).build();
    });

    when(
      /^I create an assignment with title "(.*)" for the classroom$/,
      async (title) => {
        requestBody = {
          title,
          classId: classroom.id,
        };

        response = await request(app)
          .post('/assignments')
          .send(requestBody);
      },
    );

    then('the assignment should be created successfully', () => {
      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe(requestBody.title);
    });
  });

  test('Missing assignment title', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};
    let classroom: Class;

    given(/^a classroom with name "(.*)" exists$/, async (name) => {
      classroom = await new ClassroomBuilder().withName(name).build();
      requestBody = { classId: classroom.id };
    });

    when(
      'I send a request to create an assignment without a title',
      async () => {
        response = await request(app)
          .post('/assignments')
          .send(requestBody);
      },
    );

    then('the assignment should not be created', () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('ValidationError');
    });
  });
});
