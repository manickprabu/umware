import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppMessage, MessageType } from '../../shared/notification/notification.model';

import { CaseService } from '../shared/case.service';
import { FieldsModel } from '../../shared/fields/fields.model';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html'
})
export class CreateCaseComponent implements OnInit {
  status: AppMessage;
  showForm: Boolean = true;
  caseId: string;
  form: FormGroup;
  caseFields: Array<FieldsModel> = [];

  constructor(private caseService: CaseService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.caseId = params['id'];
      return this.caseId;
    });

    this.status = new AppMessage(MessageType.info, '', `Case Id: ${ this.caseId }`);

    this.form = new FormGroup({});
    this.getCaseForm();
  }

  getCaseForm() {
    this.caseService.getCaseFields().subscribe((data) => {
      let group: any = {};

      data['fieldDefinitions'].forEach((item) => {
        const fieldControl = new FormControl('');
        group[item.name] = fieldControl;

        const field = new FieldsModel();

        field.value = item.value;
        field.defaultValue = item.defaultValue;
        field.label = item.name;
        field.mandatory = item.mandatory;
        field.name = item.name;
        field.type = item.type;
        field.updatable = item.updatable;

        this.caseFields.push(field);
      });

      this.form = new FormGroup(group);

    }, (err) => {
      this.showForm = false;
      this.status = new AppMessage(MessageType.danger, 'Error', 'Unable to connect to CCS service');
    });
  }

  onSubmit(event) {
    let metaData = {
        type: 'cf_case_folder',
        metadataMap: this.form.value
    };

    let formData = new FormData();
    formData.append('metaData', JSON.stringify(metaData));
    
    this.caseService.createCase(this.caseId, formData).subscribe((data) => {
      this.status = new AppMessage(MessageType.success,'Case successfully created', `Case Id: ${ this.caseId }`);
    }, (err) => {
      this.status = new AppMessage(MessageType.danger,'Error', `Unable to create new case using Case Id: ${ this.caseId }`);
    });
  }

}
