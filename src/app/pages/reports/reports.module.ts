import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecordChargesComponent } from './record-charges/record-charges.component';
import { ChargesComponent } from './charges/charges.component';
import { RangeDateComponent } from 'src/app/components/range-date/range-date.component';
import { SubheaderComponent } from 'src/app/components/subheader/subheader.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChargeTableComponent } from './charges/charge-table/charge-table.component';
import { BackgroundComponent } from 'src/app/components/background/background.component';

@NgModule({
  declarations: [
    RecordChargesComponent,
    ChargesComponent,
    ChargeTableComponent
  ],
  imports: [
    CommonModule,
    SubheaderComponent,
    RangeDateComponent,
    ReportsRoutingModule,
    MaterialModule,
    NgApexchartsModule,
    BackgroundComponent
  ],
})
export class ReportsModule { }
