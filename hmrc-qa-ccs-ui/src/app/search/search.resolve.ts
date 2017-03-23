import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class SearchResolve implements Resolve<any> {
    criteria: any;
    resolve(route: ActivatedRouteSnapshot) {
        return this.criteria;
    }
}