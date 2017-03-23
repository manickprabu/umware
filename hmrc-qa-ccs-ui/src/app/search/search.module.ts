import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';
import { ResultsComponent } from './results/results.component';
import { SearchService } from './shared/search.service';
import { ListModule } from '../shared/list/list.module';
import { PredefinedSearchesComponent } from '../search/predefined-searches/predefined-searches.component';
import { SharedModule } from '../shared/shared.module';
import { SearchResolve } from './search.resolve';
import { ResultsService } from './results/results.service';
import { SavedSearchesComponent } from '../search/saved-searches/saved-searches.component';
import { CardViewComponent } from './shared/card-view/card-view.component';
import { RecentlyModifiedComponent } from './recently-modified/recently-modified.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    RouterModule,
    ListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchComponent,
    PredefinedSearchesComponent,
    ResultsComponent,
    SavedSearchesComponent,
    CardViewComponent,
    RecentlyModifiedComponent
  ],
  providers: [
    SearchService,
    SearchResolve,
    ResultsService
  ],
  exports:[
    CardViewComponent
  ]
})
export class SearchModule { }
