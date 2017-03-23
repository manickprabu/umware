import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../core/config/app.config';
import { HttpClientService } from '../../shared/http-client.service';

@Injectable()
export class SearchService {

  constructor(private appConfig: AppConfig,
              private httpClientService: HttpClientService) { }
  
  searchDocuments(criteria: any): Observable<any[]> {
    const url = this.appConfig.getKey('searchDocuments')
    return this.httpClientService.post(url, criteria);
  }

  getPredefinedSearches(): Observable<any[]> {
    const url = this.appConfig.getKey('predefinedSearches');
    return this.httpClientService.get(url);
  }

  getSavedSearches(): Observable<any[]> {
    const url = this.appConfig.getKey('mySavedSearches');
    return this.httpClientService.get(url);
  }

  getModifiedSearches(): Observable<any[]> {
    const url = this.appConfig.getKey('recentlyModifiedDocuments');
    return this.httpClientService.get(url);
  }

}
