import { AppConfig } from './app.config';
import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

/**
 * Created by stephenbuckley on 22/01/2017.
 */
describe('CCS_UI Common Config :: App Config Object', () => {
  let config: AppConfig;

  beforeEach(async(() => {
    const IS_DEV = true;
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        AppConfig,
        { provide: 'IS_DEV', useValue: IS_DEV },
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

  }));
 

  it('AppConfig should exist', () => {
    expect(config).not.toBeNull();
  });

  it('shoud be created', inject([AppConfig], (config:AppConfig) => {
    expect(config).toBeTruthy();
  }))


  // it('AppConfig should have no default value', () => {
  //   expect(config.getKey('baseURL')).toBeFalsy();
  // });

  // it('AppConfig should have a baseURL default value', () => {
  //   config.setDefaults();
  //   expect(config.getKey('baseURL')).toBe('http://localhost:8090');
  // });
  // it('AppConfig should be able to set a key value', () => {
  //   config.setKeyValuePair('newURL', 'http://localhost:8021');
  //   expect(config.getKey('newURL')).toBe('http://localhost:8021');
  // });

  // it('AppConfig should be able to over write a key value', () => {
  //   config.setDefaults();
  //   expect(config.getKey('baseURL')).toBe('http://localhost:8090');
  //   config.setKeyValuePair('baseURL', 'http://localhost:8021');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:8021');
  // });

  // it('AppConfig should be able to process a config file with a single line', () => {
  //   config.parseConfigFile('baseURL=http://localhost:9090');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:9090');
  //   expect(config.getKey('newURL')).toBeFalsy();
  // });

  // it('AppConfig should be able to process a config file with a trailine newline', () => {
  //   config.parseConfigFile('baseURL=http://localhost:9090\n');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:9090');
  //   expect(config.getKey('newURL')).toBeFalsy();
  // });

  // it('AppConfig should be able to process a config file with a extra whitespace', () => {
  //   config.parseConfigFile('baseURL=http://localhost:9090  \n');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:9090');
  //   expect(config.getKey('newURL')).toBeFalsy();
  // });

  // it('AppConfig should be able to process a config file with multiple lines', () => {
  //   config.parseConfigFile('baseURL=http://localhost:9090\nnewURL=http://localhost:8080 ');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:9090');
  //   expect(config.getKey('newURL')).toBe('http://localhost:8080');
  //   expect(config.getKey('newURL2')).toBeFalsy();
  // });

  // it('AppConfig should be able to process a config file with multiple lines and scattered whitespace', () => {
  //   config.parseConfigFile(' baseURL = http://localhost:9090 \n newURL=http://localhost:8080');
  //   expect(config.getKey('baseURL')).toBe('http://localhost:9090');
  //   expect(config.getKey('newURL')).toBe('http://localhost:8080');
  //   expect(config.getKey('newURL2')).toBeFalsy();
  // });



});

