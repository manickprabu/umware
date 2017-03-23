import { Component, OnInit } from '@angular/core';

import { ListComponent } from '../../shared/list/list.component';
import { SearchService } from '../shared/search.service';

@Component({
  selector: 'app-recently-modified',
  templateUrl: './recently-modified.component.html'
})
export class RecentlyModifiedComponent implements OnInit {

  searchResult: any;
  resultRows:Array<any> = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.getModifiedSearches()
      .subscribe((response) => {
        this.searchResult = response;
      });
  }

}
