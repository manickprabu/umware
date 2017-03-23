import { Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class AppConfig {

  private _url: string = './assets/config.json';
  private config : any;

  constructor(protected _http: Http, @Inject('IS_DEV') private isDev: boolean) { }

  load() {
    return new Promise((resolve, reject) => {
      this._http.get(this._url).map(response => response.json())
        .catch( (error:any) => {
          reject(false);
          return Observable.throw( error.json() );
        })
        .subscribe(config => {
          this.config = config;
          resolve(true);
        });
    });

 }

  getKey(key: string, options: Object = {}) {

    const domain = (this.isDev) ? 'dev' :'prod';
    let uri = this.config.application[domain] + this.config.urls[key];
    
    for(var key in options) {
      uri = uri.replace(':' + key, options[key]);
    }

    return uri;
  }

}
