/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { CaseService } from './case.service';
import { HttpClientService } from '../../shared/http-client.service';
import { AppConfig } from '../../core/config/app.config';

describe('CaseService', () => {

  beforeEach(async(() => {
    class AppConfigStub {
      getKey() { }
    }

    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CaseService,
        HttpClientService,
        { provide: AppConfig, useClass: AppConfigStub },
        { provide: 'IS_DEV', useValue: true },
      ]
    });
  }));

  it('should ...', inject([CaseService], (service: CaseService) => {
    expect(service).toBeTruthy();
  }));
});
