import { Component, OnInit } from '@angular/core';
import { AppConfig } from './core/config/app.config';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  title = 'CCS-UI Dynamic Form';

  constructor() { }

  ngOnInit() { }
}
