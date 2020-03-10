import regeneratorRuntime from 'regenerator-runtime';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test POST /api/auth/signup/', () => {
  it('Should return invalid email', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastname: 'Mugorozi',
      email: 'francoismugorozigmail.com',
      password: 'pass123',
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
  it('Should return email is invalid2', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastname: 'Mugorozi',
      email: '',
      password: 'pass123',
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

  it('Should  sign up new user', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastName: 'Mugorozi',
      email: 'kaniuse@gmail.com',
      password: 'pass123',
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

  it('Should  return email already exist', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastName: 'Mugorozi',
      email: 'kaniuse@gmail.com',
      password: 'pass123',
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

  it('Should return firstName required', (done) => {
    const newUser = {
      firstName: '',
      lastName: 'Mugorozi',
      email: 'kanl@gmail.com',
      password: 'pass123',
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

  it('Should return lastName required', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastName: '',
      email: 'kank@gmail.com',
      password: 'pass123',
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

  it('Should return password not found', (done) => {
    const newUser = {
      firstName: 'Francois',
      lastName: 'Mugorozi',
      email: 'francoismugori@gmail.com',
      password: '',
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
});

describe('Test POST /api/auth/signin/ for the user to sign in', () => {
  it('Should sign in the user', (done) => {
    const newUser = {
      email: 'francoismugorozi@gmail.com',
      password: 'user123',
    };

    chai
      .request(app)
      .post('/api/auth/v1/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('Should return email not found in the database', (done) => {
    const newUser = {
      email: 'frmugozi@gmail.com',
      password: 'user123',
    };

    chai
      .request(app)
      .post('/api/auth/v1/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('Should return password not found', (done) => {
    const newUser = {
      email: 'francoismugorozi@gmail.com',
      password: 'pass123',
    };

    chai
      .request(app)
      .post('/api/auth/v1/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('Should return email is required', (done) => {
    const newUser = {
      email: '',
      password: 'pass123',
    };

    chai
      .request(app)
      .post('/api/auth/v1/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
  it('Should return password is required', (done) => {
    const newUser = {
      email: 'francoismugorozi@gmail.com',
      password: '',
    };

    chai
      .request(app)
      .post('/api/auth/v1/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });
});
