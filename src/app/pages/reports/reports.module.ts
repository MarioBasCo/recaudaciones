import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecordChargesComponent } from './record-charges/record-charges.component';
import { ChargesComponent } from './charges/charges.component';


@NgModule({
  declarations: [
    RecordChargesComponent,
    ChargesComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
