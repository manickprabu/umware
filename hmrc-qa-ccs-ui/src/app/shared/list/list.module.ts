
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent} from './header/header.component';
import { FooterComponent} from './footer/footer.component';
import { RowComponent} from './row/row.component';
import { ListComponent } from '../list/list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    RowComponent,
    ListComponent
    ],
  exports : [ListComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ListModule { }
