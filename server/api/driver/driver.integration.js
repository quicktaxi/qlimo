'use strict';

var app = require('../..');
import request from 'supertest';

var newDriver;

describe('Driver API:', function() {

  describe('GET /api/drivers', function() {
    var drivers;

    beforeEach(function(done) {
      request(app)
        .get('/api/drivers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          drivers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(drivers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/drivers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/drivers')
        .send({
          name: 'New Driver',
          info: 'This is the brand new driver!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newDriver = res.body;
          done();
        });
    });

    it('should respond with the newly created driver', function() {
      expect(newDriver.name).to.equal('New Driver');
      expect(newDriver.info).to.equal('This is the brand new driver!!!');
    });

  });

  describe('GET /api/drivers/:id', function() {
    var driver;

    beforeEach(function(done) {
      request(app)
        .get('/api/drivers/' + newDriver._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          driver = res.body;
          done();
        });
    });

    afterEach(function() {
      driver = {};
    });

    it('should respond with the requested driver', function() {
      expect(driver.name).to.equal('New Driver');
      expect(driver.info).to.equal('This is the brand new driver!!!');
    });

  });

  describe('PUT /api/drivers/:id', function() {
    var updatedDriver;

    beforeEach(function(done) {
      request(app)
        .put('/api/drivers/' + newDriver._id)
        .send({
          name: 'Updated Driver',
          info: 'This is the updated driver!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDriver = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDriver = {};
    });

    it('should respond with the updated driver', function() {
      expect(updatedDriver.name).to.equal('Updated Driver');
      expect(updatedDriver.info).to.equal('This is the updated driver!!!');
    });

  });

  describe('DELETE /api/drivers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/drivers/' + newDriver._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when driver does not exist', function(done) {
      request(app)
        .delete('/api/drivers/' + newDriver._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
