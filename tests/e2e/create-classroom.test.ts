import path from 'path';
import request from 'supertest';
import { defineFeature, loadFeature } from 'jest-cucumber';

import { app } from '../../src/index';
import { resetDatabase } from '../fixtures/reset';
import { ClassroomBuilder } from '../fixtures/classroom-builder';

const feature = loadFeature(
  path.join(
    import.meta.dirname,
    '../features/create_classroom.feature',
  ),
);

defineFeature(feature, (test) => {
  afterEach(async () => {
    await resetDatabase();
  });

  test('Successfully create a classroom', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(/^I have a classroom with name "(.*)"$/, (name) => {
      requestBody = { name };
    });

    when('I send a request to create the classroom', async () => {
      response = await request(app)
        .post('/classes')
        .send(requestBody);
    });

    then('the classroom should be created successfully', () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
      expect(response.body.success).toBe(true);
    });
  });

  test('Classroom already exists', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: any = {};

    given(
      /^a classroom with name "(.*)" already exists$/,
      async (name) => {
        requestBody = { name };
        await new ClassroomBuilder().withName(name).build();
      },
    );

    when('I send a request to create a classroom', async () => {
      response = await request(app)
        .post('/classes')
        .send(requestBody);
    });

    then('the classroom should not be created', () => {
      expect(response.status).toBe(409);
      expect(response.body.error).toBe('ClassAlreadyExists');
      expect(response.body.success).toBe(false);
    });
  });
});
