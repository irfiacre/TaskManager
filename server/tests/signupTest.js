import regeneratorRuntime from "regenerator-runtime";
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test POST /api/auth/signup/', () => {
  it('Should return invalid inputs', done => {
    const newUser = {
        firstName: 'Francois',
        lastname: 'Mugorozi',
        email: 'francoismugorozigmail.com',
        password: 'pass123'
      };
      
      chai
      .request(app)
      .post('/api/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });
  it('Should return invalid inputs', done => {
    const newUser = {
        firstName: 'Francois',
        lastname: 'Mugorozi',
        email: 'francoismugorozigmail.com',
        password: 'pass123'
      };
      
      chai
      .request(app)
      .post('/api/auth/v1/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('Should return invalid inputs', done => {
    const newUser = {
        firstName: 'Francois',
        lastName: 'Mugorozi',
        email: 'francoismugorozi@gmail.com',
        password: 'pass123'
      };
      
    chai
      .request(app)
      .post('/api/auth/v1/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });
  it('Should return invalid inputs', done => {
    const newUser = {
        firstName: 'Francois',
        lastName: 'Mugorozi',
        email: 'francoismugorozi@gmail.com',
        password: 'pass123'
      };
      
    chai
      .request(app)
      .post('/api/auth/v1/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
});
