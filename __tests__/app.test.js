const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend-gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to the github oath page on login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i);

  });

  it('should login user and redirect user to dashboard', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.req.path).toEqual('/api/v1/posts');
  });
});


it('should test the delete', async () => {
  const req = await request
    .agent(app)
    .delete('/api/v1/github');

  expect(req.body.message).toEqual('Signed out Successfully');
});

it('allows a user to create a post', async () => {
  const agent = request.agent(app);

  await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

  const res = await agent.post('/api/v1/posts').send({
    title: 'Newest Post',
    description: 'please let this work'
  });


  expect(res.body).toEqual({
    id: expect.any(String),
    title: 'Newest Post',
    description: 'please let this work',


  });
});
