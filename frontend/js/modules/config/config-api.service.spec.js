'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The esnConfigApi service', function() {

  var $httpBackend, esnConfigApi;
  var TEST_RESPONSE = [{
    name: 'moduleName',
    configurations: [{
      name: 'a config',
      value: 'a value'
    }]
  }];
  var CONFIGS_TO_GET = [{
    name: 'moduleName',
    keys: ['a config']
  }];
  var CONFIGS_TO_SET = [{
    name: 'moduleName',
    configurations: [{
      name: 'a config',
      value: 'a new value'
    }]
  }];

  beforeEach(module('esn.configuration'));

  beforeEach(inject(function(_$httpBackend_, _esnConfigApi_) {
    $httpBackend = _$httpBackend_;
    esnConfigApi = _esnConfigApi_;
  }));

  describe('The getUserConfigurations fn', function() {
    it('should send POST request to right endpoint', function(done) {
      $httpBackend
        .expectPOST('/api/configurations?scope=user', CONFIGS_TO_GET)
        .respond(TEST_RESPONSE);

      esnConfigApi
        .getUserConfigurations(CONFIGS_TO_GET)
        .then(function(configurations) {
          expect(configurations).to.deep.equal(TEST_RESPONSE);
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The setUserConfigurations fn', function() {
    it('should send PUT request to right endpoint', function(done) {
      $httpBackend
        .expectPUT('/api/configurations?scope=user', CONFIGS_TO_SET)
        .respond(204);

      esnConfigApi
        .setUserConfigurations(CONFIGS_TO_SET)
        .then(function() {
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The getDomainConfigurations fn', function() {
    it('should send POST request to right endpoint', function(done) {
      var domainId = 'domainId';

      $httpBackend
        .expectPOST('/api/configurations?domain_id=' + domainId + '&scope=domain', CONFIGS_TO_GET)
        .respond(TEST_RESPONSE);

      esnConfigApi
        .getDomainConfigurations(domainId, CONFIGS_TO_GET)
        .then(function(configurations) {
          expect(configurations).to.deep.equal(TEST_RESPONSE);
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The setDomainConfigurations fn', function() {
    it('should send PUT request to right endpoint', function(done) {
      var domainId = 'domainId';

      $httpBackend
        .expectPUT('/api/configurations?domain_id=' + domainId + '&scope=domain', CONFIGS_TO_SET)
        .respond(204);

      esnConfigApi
        .setDomainConfigurations(domainId, CONFIGS_TO_SET)
        .then(function() {
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The getPlatformConfigurations fn', function() {
    it('should send POST request to right endpoint', function(done) {
      $httpBackend
        .expectPOST('/api/configurations?scope=platform', CONFIGS_TO_GET)
        .respond(TEST_RESPONSE);

      esnConfigApi
        .getPlatformConfigurations(CONFIGS_TO_GET)
        .then(function(configurations) {
          expect(configurations).to.deep.equal(TEST_RESPONSE);
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The setPlatformConfigurations fn', function() {
    it('should send PUT request to right endpoint', function(done) {
      $httpBackend
        .expectPUT('/api/configurations?scope=platform', CONFIGS_TO_SET)
        .respond(204);

      esnConfigApi
        .setPlatformConfigurations(CONFIGS_TO_SET)
        .then(function() {
          done();
        });

      $httpBackend.flush();
    });
  });

});
