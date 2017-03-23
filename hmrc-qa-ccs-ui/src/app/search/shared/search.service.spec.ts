/* tslint:disable:no-unused-variable */

import { TestBed, async, inject} from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SearchService } from './search.service';
import { HttpClientService } from '../../shared/http-client.service';
import { AppConfig } from '../../core/config/app.config';

describe('SearchService', () => {

  beforeEach(async(() => {
    class AppConfigStub {
      getKey(){}
    }
    
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        SearchService,
        HttpClientService,
        { provide: AppConfig, useClass: AppConfigStub}, 
        { provide: 'IS_DEV', useValue: true },
      ]
    });

  }));

  it('should...', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

});
