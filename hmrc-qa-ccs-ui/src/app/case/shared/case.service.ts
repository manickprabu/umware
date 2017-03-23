import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../core/config/app.config';
import { HttpClientService } from '../../shared/http-client.service';

@Injectable()
export class CaseService {

  constructor(private appConfig: AppConfig,
              private httpClientService: HttpClientService) { }

  getCaseFields(): Observable<any[]> {
    const url = this.appConfig.getKey('metaDataFields', { formId: 'cf_case_folder' });
    return this.httpClientService.get(url);
  }

  createCase(caseId: string, formData: FormData): Observable<any[]> {
    const url = this.appConfig.getKey('ingestionCase', { caseId: caseId });
    return this.httpClientService.post(url, formData);
  };

}
