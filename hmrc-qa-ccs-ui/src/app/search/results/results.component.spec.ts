/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule,Router,ActivatedRoute} from '@angular/router';

import { ResultsComponent } from './results.component';
import { ListComponent } from '../../shared/list/list.component';
import { HeaderComponent } from '../../shared/list/header/header.component';
import { RowComponent } from '../../shared/list/row/row.component';
import { SearchService } from '../shared/search.service';
import { Http,XHRBackend,HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable} from 'rxjs';
import { FieldsComponent } from '../../shared/fields/fields.component';
import { ResultsService } from './results.service';
import { NotificationComponent } from '../../shared/notification/notification.component';

class MockRouter {
  snapshot = {
    data:{
      criteria:{}
    }
  }
}

class MockSearchService {
  public searchDocuments() {
    return {subscribe:function(){}}
  }
}
class MockResultService{
  snapshot:string;
  setData(){
    return this.snapshot;
  }
  format(){
    return [];
  }
  json() {
    return '';
  }
}

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsComponent,
        RowComponent,
        HeaderComponent,
        ListComponent,
        FieldsComponent,
        NotificationComponent
        ],
      providers: [
        {provide: Router,useClass: MockRouter},
        {provide: ActivatedRoute,useClass: MockRouter},
        {provide:SearchService, useClass: MockSearchService},
        {provide:ResultsService, useClass:MockResultService}
      ],
      imports:[ReactiveFormsModule,RouterModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
