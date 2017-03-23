import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SearchService } from '../shared/search.service';
import { SearchResolve } from '../search.resolve';
import { AppMessage, MessageType } from '../../shared/notification/notification.model';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html'
})
export class SavedSearchesComponent implements OnInit {
  dataSource: Array<any>;
  notice: AppMessage;
  sub: Subscription = new Subscription();

  constructor(private searchservice: SearchService,
              private searchResolver: SearchResolve,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.searchservice.getSavedSearches()
      .subscribe((data) => {
        this.dataSource = data;
      }, (errors) => {
        this.notice = new AppMessage(MessageType.danger, 'Error:', 'Saved searches not found');
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
