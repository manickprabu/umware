/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

import set = Reflect.set;
@Component({ selector: 'app-form-generator', template: '' })
class FormGeneratorStubComponent { };
@Component({selector: 'router-outlet',template:''})
class RouterComponentStub {};

@Component({selector: 'app-aside',template:''})
class AsideComponentStub {};
@Component({selector: 'app-header',template:''})
class HeaderComponentStub {};

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,RouterComponentStub,AsideComponentStub,HeaderComponentStub
      ],
      providers: [],
      imports:[]
        });
    
    TestBed.overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: 'IS_DEV', useValue: true }
          ]
      }

    });
  });


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app instanceof AppComponent ).toBeTruthy();
  }));

});
