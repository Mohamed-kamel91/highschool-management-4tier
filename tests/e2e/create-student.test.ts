import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { resetDatabase } from '../fixtures/reset';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/create_student.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Successfully create a student', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(
      /^I have a student with name "(.*)" and email "(.*)"$/,
      (name, email) => {
        requestBody = {
          name,
          email,
        };
      },
    );

    when('I send a request to create the student', async () => {
      response = await request(app)
        .post('/students')
        .send(requestBody);
    });

    then('The student should be created successfully', () => {
      expect(response.body.data.name).toBe(requestBody.name);
      expect(response.body.data.email).toBe(requestBody.email);
      expect(response.status).toBe(201);
    });
  });

  test('Missing student email', ({ given, when, then, and }) => {
    let requestBody: any = {};
    let response: any = {};

    given(
      /^I have a student with name "(.*)" but no email$/,
      (name) => {
        requestBody = { name };
      },
    );

    when('I send a request to create the student', async () => {
      response = await request(app)
        .post('/students')
        .send(requestBody);
    });

    then('the student should not be created', () => {
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    and('I shoud receive an error message', () => {
      expect(response.body.error).toBe('ValidationError');
    });
  });
});
