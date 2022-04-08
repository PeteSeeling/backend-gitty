const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/User');

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
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.req.path).toEqual('/api/v1/post');
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

    const res = await agent.post('/api/v1/post').send({
      title: 'Newest Post',
      description: 'please let this work'
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'Newest Post',
      description: 'please let this work',
    });



    it('gets all posts from all users', async () => {

      await GithubUser.insert({
        username:'fake_user1',
        avatar: 'https://placebear.com/150/150'
      });

      await request(app)
        .post('/api/v1/post')
        .send({
          title:'post 1',
          description:'post 1 text'
        });

      await request(app)
        .post('/api/v1/post')
        .send({
          title:'post 2',
          description:'post 2 text'
        });

      const expected = [
        {
          id: expect.any(String),
          title:'post 1',
          description:'post 1 text',
          username:'fake_user1',
          avatar: 'https://placebear.com/150/150',
        },
        {
          id: expect.any(String),
          title:'post 2',
          description:'post 2 text',
          username:'fake_user1',
          avatar: 'https://placebear.com/150/150',
        }
      ];

      const req = await request(app)
        .get('/api/v1/post');

      expect(req.body).toEqual(expected);
    });
  });

});
