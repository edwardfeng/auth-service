const { expect } = require('chai');
const { createAuthServer, close } = require('./app');
const request = require('supertest');

describe('App', () => {
  let server;

  beforeEach(() => {
    server = createAuthServer();
  });

  afterEach(() => {
    close(server);
  });

  describe('createAuthServer', () => {
    it('should return an HTTP Server object', () => {
      expect(server).to.exist;
      expect(server).to.have.property('listen').that.is.a('function');
    });

    describe('POST /auth', () => {
      it('should return 200 if the request has a JWT authentication header', (done) => {
        request(server)
          .post('/auth')
          .set('Authentication', 'Bearer <jwt-token>')
          .expect(200, done);
      });

      it('should return 401 if the request does not have a JWT authentication header', (done) => {
        request(server)
          .post('/auth')
          .expect(401, done);
      });
    });
  });
});
