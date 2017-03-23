import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../shared/search.service';
import { SearchResolve } from '../search.resolve';
import { AppMessage, MessageType } from '../../shared/notification/notification.model';

@Component({
  selector: 'app-predefined-searches',
  templateUrl: './predefined-searches.component.html'
})
export class PredefinedSearchesComponent implements OnInit, OnDestroy {
  dataSource: Array<any>;
  notice: AppMessage;
  sub: Subscription = new Subscription();

  constructor(private searchservice: SearchService,
              private searchResolver: SearchResolve,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.searchservice.getPredefinedSearches()
      .subscribe((data) => {
        this.dataSource = data;
      }, (errors) => {
        this.notice = new AppMessage(MessageType.danger, 'Error:', 'Predefined searches not found');
      });
  }

  OnSearch(event): void {
    this.searchResolver.criteria = event;
    this.router.navigate(['search/results']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
