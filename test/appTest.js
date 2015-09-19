
var expect = require("chai").expect;
var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server.js');
  });

it('Testing the root directory', function testSlash(done) {
  request(server).get('/').expect(200, done);
});
describe('Testing the /user sub URI', function () {
  it('GET request to /users', function testPath(done) {
  request(server).get('/users').expect(500, done);
  });
    it('POST request to /users', function testPath(done) {
    request(server)
      .post('/users', {"firstName": "Test","lastName": "Test","email": "test@gmail.com","password": "test","createdOn":"2015-09-17T08:24:59.685Z"
        })
      .expect(201, done);
    });
  });
});