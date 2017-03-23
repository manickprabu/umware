import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { FileUploadComponent } from '../../documents/file-upload/file-upload.component';
import { ListComponent } from '../../shared/list/list.component';
import { ResultsComponent } from '../../search/results/results.component';
import { SearchResolve } from '../../search/search.resolve';
import { SearchComponent } from '../../search/search.component';
import { PredefinedSearchesComponent } from '../../search/predefined-searches/predefined-searches.component';
import { SavedSearchesComponent } from '../../search/saved-searches/saved-searches.component';
import { RecentlyModifiedComponent } from '../../search/recently-modified/recently-modified.component';
import { NavigationComponent } from '../../shared/navigation/navigation.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
      { path: 'case/:id', component: HomeComponent },
      { path: 'case/:id/upload', component: FileUploadComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/results', component: ResultsComponent, resolve: { criteria: SearchResolve } },
      { path: 'searches/predefined', component: PredefinedSearchesComponent},
      { path: 'searches/savedsearches', component: SavedSearchesComponent},
      { path: 'searches/recently-modified', component: RecentlyModifiedComponent },
      { path: '**', redirectTo: '' }
  ];


@Component({
  selector: 'app-routing',
  template: ''
})


@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [RouterModule]
})

export class RoutingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
