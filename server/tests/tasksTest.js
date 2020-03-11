import regeneratorRuntime from 'regenerator-runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker'; // Fake data generator
import app from '../app';

import dotenv from 'dotenv';
dotenv.config();

chai.use(chaiHttp);
const { expect } = chai;

describe('Tasks: POST', () => {
  it('should create a new Task in storage', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    // Task example
    const newTask = {
      title: faker.lorem.words(3),
      description: 'Testing: new task created in the database...' + faker.lorem.sentence(7),
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
      description: 'Testing: new task created in the database...' + faker.lorem.sentence(7),
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

describe('Tasks: DELETE', () => {
  it('should remove a specific Task from storage', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    chai
      .request(app)
      .get('/api/v1/tasks')
      .set('Authorization', token)
      .end(function(err, res){

        // Get last index of data collection
        const lastIndex = res.body.data.length - 1;
        
        chai.request(app)
          .delete('/api/v1/tasks/' + res.body.data[lastIndex].id)
          .set('Authorization', token)
          .end(function(err, res){
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
        .end(function(err, res){
          expect(res.statusCode).to.equal(404)
          done();
      });
  });

  it('should be an integer on Task ID', (done) => {
    // Use infinite token (does not expire)
    const token = process.env.USER_TOKEN;

    chai.request(app)
        .delete('/api/v1/tasks/xyz')
        .set('Authorization', token)
        .end(function(err, res){
          expect(res.statusCode).to.equal(400)
          done();
      });
  });
});
