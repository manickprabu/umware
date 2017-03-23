/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CaseService } from '../shared/case.service';
import { CreateCaseComponent } from './create-case.component';

describe('CreateCaseComponent', () => {
  let comp: CreateCaseComponent;
  let fixture: ComponentFixture<CreateCaseComponent>;
  let activatedRouteStub: any;
  let caseServiceStub: any;

  beforeEach(() => {
    activatedRouteStub = {
      params: {
        subscribe: () => ({})
      }
    };
    caseServiceStub = {
      getMetaDataFields: () => ({
        subscribe: () => ({})
      }),
      getDocTypes: () => ({
        subscribe: () => ({})
      })
    };
    TestBed.configureTestingModule({
      declarations: [CreateCaseComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CaseService, useValue: caseServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CreateCaseComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

});
