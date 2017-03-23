import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SearchService } from '../../search/shared/search.service';
import { ListComponent } from '../../shared/list/list.component';
import { FieldsComponent } from '../../shared/fields/fields.component';
import { ResultsService } from './results.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
  form: FormGroup;
  fieldsList: Array<any>;
  searchResult: any;
  resultRows: Array<any> = [];
  resultsCols: Array<any> = [];

  constructor(private searchService: SearchService,
              private resultService: ResultsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.resultService.setData(this.route.snapshot.data['criteria']);
    this.fieldsList = this.resultService.format();
    
    this.updateMetaDataFields(this.fieldsList);
    this.performSearch(null);
  }

  performSearch(event) {
    if (event) {
      this.resultService.updateData(this.form.value);
    }

    this.searchService.searchDocuments(this.resultService.json())
      .subscribe((response) => {
        this.searchResult = response;
      });
  }

  private updateMetaDataFields(fieldList) {
    let group: any = {};

    fieldList.forEach((field) => {
      const fieldControl = new FormControl(field.value || '');
      group[field.name] = fieldControl;
    });

    this.form = new FormGroup(group);
  }

}