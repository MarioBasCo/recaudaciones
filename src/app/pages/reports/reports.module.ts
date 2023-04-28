import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecordChargesComponent } from './record-charges/record-charges.component';
import { ChargesComponent } from './charges/charges.component';
import { RangeDateComponent } from 'src/app/components/range-date/range-date.component';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    RecordChargesComponent,
    ChargesComponent
  ],
  imports: [
    CommonModule,
    SubheaderComponent,
    RangeDateComponent,
    ReportsRoutingModule,
    MaterialModule,
  ]
})
export class ReportsModule { }
