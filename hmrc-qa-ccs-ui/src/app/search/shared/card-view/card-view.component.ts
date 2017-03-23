import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html'
})
export class CardViewComponent {

  @Input() searchData: any;
  @Output() OnSearchClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  OnSearch(): void {
    this.OnSearchClick.emit(this.searchData);
  }

}
