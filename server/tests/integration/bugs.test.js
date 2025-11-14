/**
 * Integration tests for /api/bugs endpoints using mongodb-memory-server + supertest.
 */
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');
const { generateToken } = require('../../src/utils/auth');

jest.setTimeout(30000); // allow extra time for mongodb-memory-server setup on CI

let mongoServer;
let token;
let seededBugId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {});

  // create a token for a fake user id
  token = generateToken({ _id: new mongoose.Types.ObjectId() });

  // seed a bug used across tests
  const seed = await Bug.create({ title: 'Seed bug', description: 'Already there' });
  seededBugId = seed._id;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // keep seeded bug but delete others
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    const col = collections[key];
    // remove all documents except seeded bug in bugs collection
    if (col.collectionName === 'bugs') {
      await col.deleteMany({ _id: { $ne: seededBugId } });
    } else {
      await col.deleteMany({});
    }
  }
});

describe('Bugs API Integration', () => {
  test('POST /api/bugs - create bug (valid)', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Bug', description: 'Bug description' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('New Bug');
  });

  test('POST /api/bugs - returns 400 when missing fields', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '' });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/bugs - list bugs', async () => {
    // ensure at least the seeded bug exists
    const res = await request(app).get('/api/bugs');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/bugs/:id - retrieve bug', async () => {
    const res = await request(app).get(`/api/bugs/${seededBugId}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(seededBugId.toString());
    expect(res.body.title).toBe('Seed bug');
  });

  test('GET /api/bugs/:id - 404 for non-existent', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/bugs/${fakeId}`);
    expect(res.status).toBe(404);
  });

  test('PUT /api/bugs/:id - update status', async () => {
    const res = await request(app)
      .put(`/api/bugs/${seededBugId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'in-progress' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('in-progress');
  });

  test('DELETE /api/bugs/:id - delete bug', async () => {
    // create a bug then delete it
    const created = await Bug.create({ title: 'To delete', description: 'x' });
    const res = await request(app)
      .delete(`/api/bugs/${created._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const found = await Bug.findById(created._id);
    expect(found).toBeNull();
  });
});
