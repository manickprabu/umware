import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { AppMessage, MessageType } from '../notification/notification.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnChanges {

  @Input() showView: boolean;
  @Input() dataset: Array<any>
  @Output() OnViewClick: EventEmitter<any> = new EventEmitter<any>();

  errorMessage: AppMessage;
  hasData: boolean = false;
  cols: Array<string>;

  constructor() { }

  private initializeColumns(dataTable: any) {
    this.cols = new Array<string>();
    for (var property in dataTable) {
      this.cols.push(this.formatColumnHeader(property));
    }
  }

  private formatColumnHeader(heading: string): string {
    return heading;
  }

  ngOnChanges() {
    this.errorMessage = null;
    this.hasData = (this.dataset !== undefined) ? true : false;
    if (this.hasData && this.dataset.length > 0) {
      this.initializeColumns(this.dataset[0]);
    } else {
      this.hasData = false;
      this.errorMessage = new AppMessage(MessageType.warning, '', 'No results to display.');
    }
  }

  getValue(rowIndex, columnIndex) {
    let current = this.dataset[rowIndex][columnIndex];
    if (typeof(current) === 'object') {
      let thisValue = this.getConcatenatedProperties(current);
      return thisValue;
    } else {
      return current;
    }
  }

  getConcatenatedProperties(current: any) {
    let concatenated = '';
    for (var p in current) {
      if (typeof current[p] === 'object') {
        concatenated += this.getConcatenatedProperties(current[p]) + ',';
      } else {
        concatenated += (current[p] === '' ? '' : current[p] + ',');
      }
    }
    return concatenated.slice(0, concatenated.length - 1);
  }

  OnView(rowIndex: number): any {
    this.OnViewClick.emit(this.dataset[rowIndex]);
  }

}