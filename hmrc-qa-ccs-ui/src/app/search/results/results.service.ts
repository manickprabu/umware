import { Injectable } from '@angular/core';

import { FieldsModel } from '../../shared/fields/fields.model';

@Injectable()
export class ResultsService {
  _data: Array<any>;

  constructor() { }

  setData(values) {
    if (values && values.searchCriteria) {
      this._data = values.searchCriteria;
      localStorage.setItem('searchCriteria', JSON.stringify(this._data));
    }
  }

  getData() {
    if (!this._data) {
      this._data = JSON.parse(localStorage.getItem('searchCriteria'));
    }
    return this._data;
  }

  json() {
    return JSON.stringify(this._data);
  }

  updateData(values: any) {
    this._data.forEach((item) => {
      item.value = values[item.name];
    })
  }

  format() {
    let fieldsList:Array<FieldsModel> = [];
    let data = this.getData();

    data.forEach((item) => {
      const field = new FieldsModel();

      field.value = item.value;
      field.defaultValue = item.value;
      field.label = item.name;
      field.mandatory = true;
      field.name = item.name;
      field.type = 'Text';
      field.updatable = true;

      fieldsList.push(field);
    });

    return fieldsList;
  }
}



