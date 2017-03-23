import { Component, OnInit,OnChanges,Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnChanges {
  @Input() rowData: Array<string>
  constructor() { }

  ngOnChanges() {
  }

}
