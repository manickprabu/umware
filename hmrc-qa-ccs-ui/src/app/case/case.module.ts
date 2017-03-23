import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CreateCaseComponent } from './create-case/create-case.component';
import { CaseService } from './shared/case.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateCaseComponent
  ],
  exports: [
    CreateCaseComponent
  ],
  providers: [
    CaseService
  ]
})
export class CaseModule { }
