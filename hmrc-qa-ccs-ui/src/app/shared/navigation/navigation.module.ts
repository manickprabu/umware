
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AsideComponent} from './aside/aside.component';
import { HeaderComponent} from './header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavigationComponent,  
    HeaderComponent,
    AsideComponent
    ],
  exports : [
    NavigationComponent,
    HeaderComponent,
    AsideComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class NavigationModule { }
