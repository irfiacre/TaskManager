import regeneratorRuntime from 'regenerator-runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker'; // Fake data generator
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;
let id;
describe('Tasks: POST', () => {
  it('should create a new Task in storage', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    // Task example
    const newTask = {
      title: faker.lorem.words(3),
      description: `Testing: new task created in the database...${faker.lorem.sentence(7)}`,
    };

    chai
      .request(app)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(newTask)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should return error for missing Task title', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    // Task example
    const newTask = {
      title: '',
      description: `Testing: new task created in the database...${faker.lorem.sentence(7)}`,
    };

    chai
      .request(app)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(newTask)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should return error for missing Task description', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    // Task example
    const newTask = {
      title: faker.lorem.words(3),
      description: '',
    };

    chai
      .request(app)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(newTask)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});

describe('Tasks: UPDATE', () => {
  it('should update task', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;
    chai.request(app)
      .patch('/api/v1/tasks/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
      });
    done();
  });
});

describe('Tasks: DELETE', () => {
  it('should remove a specific Task from storage', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    chai
      .request(app)
      .get('/api/v1/tasks')
      .set('Authorization', token)
      .end((err, res) => {
        // Get last index of data collection
        const lastIndex = res.body.data.length - 1;

        chai.request(app)
          .delete(`/api/v1/tasks/${  res.body.data[lastIndex].id}`)
          .set('Authorization', token)
          .end((err, res) => {
                        expect(res.statusCode).to.equal(200)
                        done();
                    });
      });
  });

  it('should return Not Found for missing Task in storage', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .delete('/api/v1/tasks/1000')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('should be an integer on Task ID', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .delete('/api/v1/tasks/xyz')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});

describe('View Task', () => {
  it('should return id must be a number', (done) => {
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .get('/api/v1/task?taskid=mnb')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('should create a new Task in storage', (done) => {
    const token = process.env.USER_TOKEN;

    const newTask = {
      title: faker.lorem.words(3),
      description: `Testing: new task created in the database...${faker.lorem.sentence(7)}`,
    };

    chai
      .request(app)
      .post('/api/v1/tasks')
      .set('Authorization', token)
      .send(newTask)
      .end((err, res) => {
        console.log(res.body.data.id);
        id = res.body.data.id;
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('should task Not found', (done) => {
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .get('/api/v1/task?taskid=890')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('should return View successful', (done) => {
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .get(`/api/v1/task?taskid=${id}`)
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('should return View successful', (done) => {
    const token = process.env.USER_TOKEN;

    chai.request(app)
      .get('/api/v1/task')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});
